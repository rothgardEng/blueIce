import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";

export async function GET(req, res) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const admins = await prisma.admin.findMany({
      select: {
        firstName: true,
        lastName: true,
        email:true
      }
    });
    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving admin name data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
