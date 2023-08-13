import { type NextRequest, NextResponse } from 'next/server';

import db from '~/lib/db';
import { coerceBoolean } from '~/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const complete = coerceBoolean.parse(searchParams.get('complete') ?? true);

    const collections = await db.imageCollection.findMany({
      include: {
        images: {
          take: complete ? undefined : 1,
        },
      },
    });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    return new Response('Could not fetch Image Collections, please try again later', {
      status: 500,
    });
  }
}
