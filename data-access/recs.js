import { S3 } from "@aws-sdk/client-s3";
import { prisma } from "@/server/db/client";
import xss from "xss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { checkAdmin, getAdminName } from "./authActions";

import { v4 as uuidv4 } from "uuid";
const s3 = new S3({
  region: "us-east-1"
});


export async function getRecs(page, pageSize) {
  page = Number(page);
  pageSize = Number(pageSize);
  try {
    const recs = await prisma.recommendation.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });

    const recsCount = await prisma.recommendation.count();
    const recsObj = {};
    recsObj["data"] = recs;
    recsObj["count"] = recsCount;
    return recsObj;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}



export async function getRecById(id) {
  const originalRec = await prisma.recommendation.findUnique({
    where: {
      id: Number(id)
    }
  });
  await prisma.$disconnect();

  return originalRec;
}


export async function updateRecById(
  id,
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
        mediaType,
        genre,
        fileName,
) {

  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);

  let returnObj = {}

  if(!admin) {
      returnObj.error = true;
      returnObj.message = "Access Denied"
     return  returnObj
  }

  try {

    returnObj = await prisma.recommendation.update({
      where: {
        id: Number(id)
      },
      data: {
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
        typeA: mediaType,
        genre,
        fileName,
      }
    });

  } catch(err) {
    console.log(err)
    returnObj.error = true;
    returnObj.message = err.message
  } finally {
    await prisma.$disconnect();
    return returnObj
  }
}






export async function createRec({
  title,
  titleSpanish,
  titleSpanishHowTranslated,
  body,
  bodySpanish,
  bodySpanishHowTranslated,
  author,
  imageLink,
  imageAlt,
  imageAltSpanish,
  imageAltSpanishHowTranslated,
  typeA,
  link,
  genre,
  anon
}) {
  title = xss(title);
  titleSpanish = xss(titleSpanish);
  body = xss(body);
  bodySpanish = xss(bodySpanish);
  imageAlt = xss(imageAlt);
  imageAltSpanish = xss(imageAltSpanish);
  author = xss(author);

  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);
  console.log(admin);

  if (!admin) {
    const errorResponse = {
      ok: false,
      error: "You do not have the required authorization.",
      status: 403,
      statusText: "Forbidden"
    };

    throw new Error(JSON.stringify(errorResponse));
  }

  if (anon === "true") {
    anon = true;
  } else {
    anon = false;
  }

  const {firstName, lastName} = await getAdminName(session.id);
  const createdBy = `${firstName} ${lastName}`;

  const extension = imageLink.name.split(".").pop();
  const fileName = `recs-${uuidv4()}-${title}.${extension}`;
  const bufferedImage = await imageLink.arrayBuffer();

  s3.putObject({
    Bucket: "defund-nova-police",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: imageLink.type
  });

  imageLink = `https://defund-nova-police.s3.amazonaws.com/${fileName}`;

  try {
    const recs = await prisma.recommendation.create({
      data: {
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
        typeA,
        genre,
        author,
        anon,
        createdBy
      }
    });

    return {
      ok: true,
      recs,
      status: 201,
      statusText: "Recommendation created!"
    };
  } catch (error) {
    console.error(error);
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


export async function deleteRecById(id) {
  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);
  let returnObj = {}
  if(!admin) {
    returnObj.error = true;
    returnObj.message = "Access Denied"
   return  returnObj
  }


  try {

    returnObj = await prisma.recommendation.delete({
      where: {
        id: Number(id)
      },
    });



  } catch(err) {
    console.log(err)
    returnObj.error = true;
    returnObj.message = err.message
  } finally {
    await prisma.$disconnect();
    return returnObj
  }



}
