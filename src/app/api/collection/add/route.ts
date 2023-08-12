import { getToken } from 'next-auth/jwt';
import { type NextRequest } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';
import { ImageCollectionUpdateValidator } from '~/lib/validators/image-collection';

export async function UPDATE(req: NextRequest) {
  try {
    const body = await req.json();
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { imageId, collectionId } = ImageCollectionUpdateValidator.parse(body);
    const userId = z.string().min(1).parse(token.sub);

    await db.image.update({
      where: {
        id: imageId,
        userId: userId,
      },
      data: {
        collectionId: collectionId,
      },
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not update assigned Image Collection, please try again later', {
      status: 500,
    });
  }
}
