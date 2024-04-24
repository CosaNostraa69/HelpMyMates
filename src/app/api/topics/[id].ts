import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextRequest) {
  const { method } = req;
  const topicId = req.nextUrl.pathname.split('/').pop();

  switch (method) {
    case 'GET':
      // Récupérer un topic spécifique
      const topic = await prisma.topic.findUnique({
        where: { id: Number(topicId) },
        include: { comments: true } // Inclure les commentaires liés au topic
      });
      return NextResponse.json(topic);

    case 'PUT':
      // Mettre à jour un topic
      const data = await req.json();
      const updatedTopic = await prisma.topic.update({
        where: { id: Number(topicId) },
        data: { title: data.title, content: data.content }
      });
      return NextResponse.json(updatedTopic);

    case 'DELETE':
      // Supprimer un topic
      const deletedTopic = await prisma.topic.delete({
        where: { id: Number(topicId) }
      });
      return NextResponse.json(deletedTopic);

    default:
      return new NextResponse(null, { status: 405 });
  }
}
