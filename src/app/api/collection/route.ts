import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import db from '~/lib/db';
import { coerceBoolean } from '~/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = z.string().parse(searchParams.get('id'));
    const complete = coerceBoolean.parse(searchParams.get('complete') ?? true);

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

    const collection = await db.imageCollection.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        images: {
          take: complete ? undefined : 1,
        },
      },
    });

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.message, { status: 400 });
    }

    return NextResponse.json('Could not get Image Collection, please try again later', {
      status: 500,
    });
  }
}
