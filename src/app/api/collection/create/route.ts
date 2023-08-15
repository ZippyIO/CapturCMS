import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';
import { ImageCollectionValidator } from '~/lib/validators/image-collection';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId, name, description, images } = ImageCollectionValidator.parse({
      userId: token.sub,
      ...body,
    });

    const collection = await db.imageCollection.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        images: {
          connectOrCreate: images.map((id) => ({
            where: { fileKey: id?.fileKey },
            create: {
              userId: userId,
              name: id?.name,
              description: id?.description,
              fileName: id?.fileName,
              fileSize: id?.fileSize,
              fileKey: id?.fileKey,
              fileUrl: id?.fileUrl,
            },
          })),
        },
      },
    });

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not create Image Collection, please try again later', {
      status: 500,
    });
  }
}
