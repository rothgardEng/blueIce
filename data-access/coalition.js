import { S3 } from "@aws-sdk/client-s3";
import { prisma } from "@/server/db/client";
import xss from "xss";
import { v4 as uuidv4 } from "uuid";
import { getUserSession } from "../Lib/auth/auth.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { checkAdmin } from "./authActions";

const s3 = new S3({
  region: "us-east-1"
});

export async function getOrgById(id) {
  const prismaObj = await prisma.orginization.findUnique({
    where: {
      id: Number(id)
    }
  });
  await prisma.$disconnect();

  return prismaObj;
}

export async function getOrgs() {
  try {
    const orgs = await prisma.orginization.findMany();
    return orgs;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createOrg({
  orgName,
  imageLink,
  imageAlt,
  imageAltSpanishHowTranslated,
  imageAltSpanish,
  english,
  spanish,
  descriptionSpanishHowTranslated,
  twitter,
  instagram,
  facebook,
  website
}) {
  spanish = xss(spanish);
  english = xss(english);
  orgName = xss(orgName);
  imageAlt = xss(imageAlt);
  imageAltSpanish = xss(imageAltSpanish);

  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);

  if (!admin) {
    const errorResponse = {
      ok: false,
      error: "You do not have the required authorization.",
      status: 403,
      statusText: "Forbidden"
    };

    throw new Error(JSON.stringify(errorResponse));
  }

  const extension = imageLink.name.split(".").pop();
  const baseFileName = imageLink.name.substring(
    0,
    imageLink.name.lastIndexOf(".")
  );
  const fileName = `org-${baseFileName}-${uuidv4()}.${extension}`;

  const bufferedImage = await imageLink.arrayBuffer();

  await s3.putObject({
    Bucket: "defund-nova-police",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: imageLink.type
  });

  imageLink = `https://defund-nova-police.s3.amazonaws.com/${fileName}`;
  try {
    const orgs = await prisma.orginization.create({
      data: {
        orgName,
        spanish,
        english,
        descriptionSpanishHowTranslated,
        twitter,
        instagram,
        facebook,
        website,
        imageLink,
        imageAlt,
        imageAltSpanish,
        imageAltSpanishHowTranslated
      }
    });
    return { ok: true, orgs, status: 201, statusText: "Org created!" };
  } catch (error) {
    const errorResponse = {
      ok: false,
      error: error.message,
      status: 500,
      statusText: "Internal Server Error"
    };

    throw new Error(JSON.stringify(errorResponse));
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteOrgById(id) {
  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);
  let returnObj = {};
  if (!admin) {
    returnObj.error = true;
    returnObj.message = "Access Denied";
    return returnObj;
  }

  try {
    returnObj = await prisma.orginization.delete({
      where: {
        id: Number(id)
      }
    });
  } catch (err) {
    console.log(err);
    returnObj.error = true;
    returnObj.message = err.message;
  } finally {
    await prisma.$disconnect();
    return returnObj;
  }
}

export async function updateOrgById(
  id,
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
) {
  const session = await getServerSession(authOptions);
  const admin = await checkAdmin(session.id);
  let returnObj = {};
  if (!admin) {
    returnObj.error = true;
    returnObj.message = "Access Denied";
    return returnObj;
  }

  try {
    returnObj = await prisma.orginization.update({
      where: {
        id: Number(id)
      },
      data: {
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
      }
    });
  } catch (err) {
    console.log(err);
    returnObj.error = true;
    returnObj.message = err.message;
  } finally {
    await prisma.$disconnect();
    return returnObj;
  }
}
