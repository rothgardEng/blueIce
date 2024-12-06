import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { checkAdmin } from "@/data-access/authActions";
import { getNewsById, updateNewsById, deleteNewsById } from "@/data-access/news";



const s3 = new S3({
  region: "us-east-1",
});

export async function PUT(request, { params }) {

  const session = await getServerSession(authOptions);
  const admin = await checkAdmin(session.id);
  if (!admin) {
    return NextResponse.json({
      success: false,
      message: 'Access denied. You do not have the required authorization.'
    }, { status: 403 });
  }

  const data = await request.formData();
  const file = data.get("file") || null;
  const title = data.get("title") || null;
  const titleSpanish = data.get("titleSpanish") || null;
  const titleSpanishHowTranslated = data.get('titleSpanishHowTranslated') || null;
  const body = data.get("body") || null;
  const bodySpanish = data.get("bodySpanish") || null;
  const bodySpanishHowTranslated = data.get("bodySpanishHowTranslated") || null;
  const imageAlt = data.get("imageAlt") || null;
  const imageAltSpanish = data.get("newsImgAltSpanish")
  const imageAltSpanishHowTranslated = data.get("imageAltSpanishHowTranslated")
  const link = data.get("link") || null;
  const select = data.get("select") || null;
  let anon = data.get("anon") || null;
  anon = anon === "true";

  let isNewPhoto = data.get("isNewPhoto") || null;
  isNewPhoto = isNewPhoto === "true";

  const originalNews = await getNewsById(params.id)

  let fileName = originalNews.fileName;
  let imageLink = originalNews.imageLink;
  let parceS3Name = imageLink.split('/').pop();

  if (isNewPhoto) {
    // aws

    const extension = file.name.split(".").pop();
    const bufferedImage = await file.arrayBuffer();
    let originalImageLinkExt = imageLink.split(".").pop()
    if (extension === originalImageLinkExt) {
      s3.putObject({
        Bucket: "defund-nova-police",
        Key: parceS3Name,
        Body: Buffer.from(bufferedImage),
        ContentType: file.type,
      });



      imageLink = `https://defund-nova-police.s3.amazonaws.com/${parceS3Name}`;
    } else {


    // if so can overwrite
    // if not make new file
   fileName = `news-photo-${uuidv4()}.${extension}`;

   s3.putObject({
    Bucket: "defund-nova-police",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: file.type,
  });

  imageLink = `https://defund-nova-police.s3.amazonaws.com/${fileName}`;
 }

 }


  try {
    const updatedNews= await updateNewsById(params.id,
      title,
      titleSpanish,
      titleSpanishHowTranslated,
      body,
      bodySpanish,
      bodySpanishHowTranslated,
      imageLink,
      imageAlt,
      imageAltSpanish,
      imageAltSpanishHowTranslated,
      link,
      anon,
      select,
      fileName
    )

    if (updatedNews.message === "Access Denied" ) {
      return NextResponse.json({
        success: false,
        message: 'Access denied. You do not have the required authorization.',
        error:"Access denied. You do not have the required authorization."
      }, { status: 403 });
    }

    if (updatedNews?.error ) {
      return NextResponse.json({
        success: false,
        message: 'Item was not not deleted, Item was not found, another admin may have deleted it/ prisma issue',
        error: updatedNews.message
       }, { status: 404 });
    }


    return NextResponse.json({
      success: true,
      message: 'Rec item updated successfully',
      data: updatedNews,
    }, { status: 200 });
  } catch (err) {

    return NextResponse.json({
      success: false,
      message: 'Failed to update news item, internal server error. Please try again later.',
      error: err.message || 'An unexpected error occurred',
    }, { status: 500 });
  }


}

export async function DELETE(request, { params }) {
  try {
    const deleteNews = await deleteNewsById(params.id)

    if (deleteNews.message === "Access Denied" ) {
      return NextResponse.json({
        success: false,
        message: 'Access denied. You do not have the required authorization.',
        error:"Access denied. You do not have the required authorization."
      }, { status: 403 });
    }

    if (deleteNews?.error ) {
      return NextResponse.json({
        success: false,
        message: 'Item was not not deleted. Item was not found',
        error: deleteNews.message
       }, { status: 404 });
    }


    if(deleteNews?.fileName) {

      const s3DeleteResponse = await s3.deleteObject({
        Bucket: "defund-nova-police",
        Key: deleteNews.fileName,
      });
    }



    return NextResponse.json({ success: true, message: "News item deleted successfully", data: deleteNews  }, { status: 200 });
  } catch (err) {

    return NextResponse.json(
      { success: false, message:"Failed to delete record, let webmaster know if you see this", error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
