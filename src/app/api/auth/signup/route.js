import { prisma } from "@/server/db/client";
import xss from "xss";
import { hashPassword } from "@/Lib/auth/auth.js";
import { NextResponse } from "next/server";

// https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
export async function POST(req) {
  let { email, password, firstName, lastName, isOverlord } = await req.json();

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return new Response(JSON.stringify(resEmptyBody), {
      status: 400,
      statusText: "invalid input!"
    });
  }

  firstName = xss(firstName);
  lastName = xss(lastName);

  const hashedPassword = await hashPassword(password);

  const resEmptyBody = { "uh-oh": "data no good" };

  const existingEmail = await prisma.admin.findFirst({
    where: { email: email }
  });

  if (existingEmail) {
    await prisma.$disconnect();
    return new Response(JSON.stringify({ error: "Email already in use" }), {
      status: 422,
      statusText: "Unprocessable Entity"
    });
  }

  try {
    const newAdmin = await prisma.admin.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
        isOverlord
      }
    });

    delete newAdmin.hashedPassword;
    delete newAdmin.id;
    delete newAdmin.isOverlord;

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        data: newAdmin
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to creat admin, internal server error. Please try again later.",
        error: error.message || "An unexpected error occurred"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return new Response("hi");
}
