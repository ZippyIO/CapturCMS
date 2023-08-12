import { getToken } from 'next-auth/jwt';
import { type NextRequest } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';
import { ImageValidator } from '~/lib/validators/image';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId, name, description, fileName, fileSize, fileKey, fileUrl } =
      ImageValidator.parse({ userId: token.sub, ...body });

    await db.image.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        fileName: fileName,
        fileSize: fileSize,
        fileKey: fileKey,
        fileUrl: fileUrl,
      },
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response('Could not create Image, please try again later', { status: 500 });
  }
}
