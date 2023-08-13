import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import db from '~/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.sub) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = z.string().min(1).parse(token.sub);

    const collections = await db.imageCollection.findMany({
      where: {
        userId: userId,
      },
      include: {
        images: {
          take: 1,
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
