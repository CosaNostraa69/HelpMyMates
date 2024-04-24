import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextRequest) {
  const { method } = req;

  if (method === 'POST') {
    const data = await req.json();
    const newComment = await prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        topicId: data.topicId
      }
    });
    return NextResponse.json(newComment);
  } else {
    return new NextResponse(null, { status: 405 });
  }
}
