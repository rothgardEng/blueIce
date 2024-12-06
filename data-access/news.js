import { S3 } from "@aws-sdk/client-s3";
import { prisma } from "@/server/db/client";
import xss from "xss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";

import { v4 as uuidv4 } from "uuid";
import { checkAdmin, getAdminName } from "./authActions";

const s3 = new S3({
  region: "us-east-1"
});

export async function getNews(page, pageSize) {
  page = Number(page);
  pageSize = Number(pageSize);

  try {
    const news = await prisma.news.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });
    const newsCount = await prisma.news.count();
    const newsObj = {};
    newsObj["data"] = news;
    newsObj["count"] = newsCount;
    return newsObj;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getNewsById(id) {
  const originalNews = await prisma.news.findUnique({
    where: {
      id: Number(id)
    }
  });
  await prisma.$disconnect();

  return originalNews;
}

export async function updateNewsById(
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
  select,
  fileName
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
  returnObj = await prisma.news.update({
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
      typeA: select,
      fileName
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

export async function createNews({
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
  typeA
}) {
  title = xss(title);
  titleSpanish = xss(titleSpanish);
  body = xss(body);
  bodySpanish = xss(bodySpanish);
  imageAlt = xss(imageAlt);
  imageAltSpanish = xss(imageAltSpanish);
  link = xss(link);

  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);

  if (!admin) {
    const errorResponse = {
      ok: false,
      error: "You are not an admin",
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

  const { firstName, lastName } = await getAdminName(session.id);
  const createdBy = `${firstName} ${lastName}`;

  const extension = imageLink.name.split(".").pop();
  const fileName = `news-${title}-${uuidv4()}.${extension}`;

  const bufferedImage = await imageLink.arrayBuffer();

  s3.putObject({
    Bucket: "defund-nova-police",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: imageLink.type
  });

  imageLink = `https://defund-nova-police.s3.amazonaws.com/${fileName}`;

  try {
    const news = await prisma.news.create({
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
        anon,
        fileName,
        createdBy
      }
    });
    return { ok: true, news, status: 201, statusText: "News created!" };
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


export async function deleteNewsById(id) {
  const session = await getServerSession(authOptions);

  const admin = await checkAdmin(session.id);
  let returnObj = {}
  if(!admin) {
    returnObj.error = true;
    returnObj.message = "Access Denied"
   return  returnObj
  }

  try {

    returnObj = await prisma.news.delete({
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
