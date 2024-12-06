import { prisma } from "@/server/db/client";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/Lib/auth/auth.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  let { oldPassword, newPassword } = await req.json();

  const admin = await prisma.admin.findFirst({
    where: { email: session.user.email }
  });
  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Current user not found, password not updated",
        error: "Current User not found, password not updated"
      },
      { status: 404, statusText: "Not Found" }
    );
  }
  const passwordMatches = await bcrypt.compare(
    oldPassword,
    admin.hashedPassword
  );

  if (!passwordMatches) {
    return NextResponse.json(
      {
        success: false,
        message: "Please double check your entries",
        error: "Please double check your entries"
      },
      { status: 422, statusText: "Unprocessable Entity" }
    );
  }
  const newHashedPassword = await hashPassword(newPassword);
  try {
    const passworUpObj = await prisma.admin.update({
      where: { id: admin.id },
      data: { hashedPassword: newHashedPassword }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password updated"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update password",
        error: error.message || "An unexpected error occurred"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
