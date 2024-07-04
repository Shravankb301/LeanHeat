// app/api/save-website/route.ts

import { PrismaClient } from 'prisma/@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()



export async function POST(request: Request) {
  console.log("API Route Hit"); // Debugging log
  const { website } = await request.json();
  console.log("Website:", website); // Debugging log

  


  if (!website) {
    return NextResponse.json({ success: false, message: "Website URL is required" }, { status: 400 });
  }

  try {
    const result = await prisma.website.create({
      data: {
        url: website,
      },
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error saving website:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
