import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const topics = await prisma.topic.findMany();
    return NextResponse.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { title, content, userId } = await request.json();
  try {
    const newTopic = await prisma.topic.create({
      data: {
        title,
        content,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 });
  }
}