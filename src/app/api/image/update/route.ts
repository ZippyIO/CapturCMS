import { getToken } from 'next-auth/jwt';
import { type NextRequest } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';
import { ImageUpdateValidator } from '~/lib/validators/image';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { id, userId, name, description, collectionId } = ImageUpdateValidator.extend({
      id: z.string().nonempty(),
      userId: z.string().nonempty(),
    }).parse({ ...body, userId: token.sub });

    await db.image.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        name: name,
        description: description,
        collectionId: collectionId,
      },
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not update Image, please try again later', { status: 500 });
  }
}
