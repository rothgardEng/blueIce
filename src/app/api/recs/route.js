import { authOptions } from "@/Lib/auth/nextAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request){
    const session = await getServerSession(authOptions)

    return NextResponse.json({hi:1})
}
