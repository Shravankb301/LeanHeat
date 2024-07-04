import { NextResponse } from 'next/server';
import { PrismaClient } from 'prisma/@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const websites = await prisma.website.findMany();
    return NextResponse.json({ success: true, data: websites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching websites:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
