import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const topicId = parseInt(req.query.topicId as string, 10);

  if (req.method === 'POST') {
    const { content, userId } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          user: { connect: { id: userId } },
          topic: { connect: { id: topicId } },
        },
      });
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}