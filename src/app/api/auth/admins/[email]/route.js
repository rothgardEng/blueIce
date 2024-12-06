import { NextResponse } from "next/server";
import { prisma } from "@/server/db/client";



export async function DELETE(request, { params }) {
  try {
    const deleteAdmin = await prisma.admin.delete({
      where: {
        email: String(params.email),
      },
    });





    return NextResponse.json(  {
      success: true,
      message: "Admin Deleted",
    },
    { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete admin",
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
