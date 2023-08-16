import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = z.string().nonempty().parse(searchParams.get('id'));

    const apiKey = req.headers.get('x-api-key');
    const app = await db.app.findUniqueOrThrow({
      where: {
        id: '1',
      },
    });

    if ((app.public === false && !apiKey) || (app.public === false && app.apiKey !== apiKey)) {
      return NextResponse.json('API key is required, access level is set to private', {
        status: 401,
      });
    }

    const image = await db.image.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        fileName: true,
        fileSize: true,
        fileKey: true,
        fileUrl: true,
        collection: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.message, { status: 400 });
    }

    return NextResponse.json('Could not find Image, please try again later', { status: 500 });
  }
}
