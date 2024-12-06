import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import {
  deleteOrgById,
  getOrgById,
  updateOrgById
} from "@/data-access/coalition";
import { getServerSession } from "next-auth";
import { checkAdmin } from "@/data-access/authActions";
import { authOptions } from "@/Lib/auth/nextAuth";

const s3 = new S3({
  region: "us-east-1"
});

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  const admin = await checkAdmin(session.id);

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Access denied. You do not have the required authorization."
      },
      { status: 403 }
    );
  }
  const data = await request.formData();
  const file = data.get("file");
  const orgName = data.get("orgName");
  const imageAlt = data.get("imageAlt");
  const imageAltSpanish = data.get("imageAltSpanish");
  const imageAltSpanishHowTranslated = data.get("imageAltSpanishHowTranslated");
  const english = data.get("orgDescriptionEnglish");
  const spanish = data.get("orgDescriptionSpanish");
  const descriptionSpanishHowTranslated = data.get(
    "descriptionSpanishHowTranslated"
  );
  const twitter = data.get("twitter");
  const instagram = data.get("instagram");
  const facebook = data.get("facebook");
  const website = data.get("website");

  let isNewPhoto = data.get("isNewPhoto") || null;
  console.log(isNewPhoto, "in api");
  isNewPhoto = isNewPhoto === "true";
  console.log(isNewPhoto, "in api");
  const originalOrg = await getOrgById(params.id);


  let fileName = originalOrg.fileName;
  let imageLink = originalOrg.imageLink;
  let parceS3Name = imageLink.split("/").pop();


  if (isNewPhoto) {
    // aws

    const extension = file.name.split(".").pop();
    const bufferedImage = await file.arrayBuffer();
    let originalImageLinkExt = imageLink.split(".").pop();
    if (extension === originalImageLinkExt) {
      s3.putObject({
        Bucket: "defund-nova-police",
        Key: parceS3Name,
        Body: Buffer.from(bufferedImage),
        ContentType: file.type
      });

      imageLink = `https://defund-nova-police.s3.amazonaws.com/${parceS3Name}`;
    } else {
      // if so can overwrite
      // if not make new file
      fileName = `org-photo-${uuidv4()}.${extension}`;

      s3.putObject({
        Bucket: "defund-nova-police",
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: file.type
      });

      imageLink = `https://defund-nova-police.s3.amazonaws.com/${fileName}`;
    }
  }

  try {
    const updatedPrismaObj = await updateOrgById(
      params.id,
      imageLink,
      orgName,
      imageAlt,
      imageAltSpanish,
      imageAltSpanishHowTranslated,
      english,
      spanish,
      descriptionSpanishHowTranslated,
      twitter,
      instagram,
      facebook,
      website
    );


    if (updatedPrismaObj.message === "Access Denied" ) {
      return NextResponse.json({
        success: false,
        message: 'Access denied. You do not have the required authorization.',
        error:"Access denied. You do not have the required authorization."
      }, { status: 403 });
    }

    if (updatedPrismaObj?.error ) {
      return NextResponse.json({
        success: false,
        message: 'Item was not not deleted, Item was not found, another admin may have deleted it / prisma issue',
        error: updatedRec.message
       }, { status: 404 });
    }


    return NextResponse.json({
      success: true,
      message: 'Rec item updated successfully',
      data: updatedPrismaObj,
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: 'Failed to update rec item, internal server error. Please try again later.',
      error: err.message || 'An unexpected error occurred',
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const prismaObj = await deleteOrgById(params.id);

    if (prismaObj.message === "Access Denied") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. You do not have the required authorization.",
          error: "Access denied. You do not have the required authorization."
        },
        { status: 403 }
      );
    }

    if (prismaObj?.error) {
      return NextResponse.json(
        {
          success: false,
          message: "Item was not not deleted, Item was not found",
          error: prismaObj.message
        },
        { status: 404 }
      );
    }

    if (prismaObj?.fileName) {
      const s3DeleteResponse = await s3.deleteObject({
        Bucket: "defund-nova-police",
        Key: prismaObj.fileName
      });
    }

    let fileName = prismaObj.imageLink.split("/").pop();

    const s3DeleteResponse = await s3.deleteObject({
      Bucket: "defund-nova-police",
      Key: fileName
    });
    return NextResponse.json(
      {
        success: true,
        message: "Org item deleted successfully",
        data: prismaObj
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete record, let webmaster know if you see this",
        error: "Failed to delete record"
      },
      { status: 500 }
    );
  }
}
