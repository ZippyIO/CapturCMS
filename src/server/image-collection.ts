'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';

export async function getAllImageCollections(allImages = true) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const collections = await db.imageCollection.findMany({
      include: {
        images: {
          take: allImages ? undefined : 1,
        },
      },
    });

    return collections;
  }
}
