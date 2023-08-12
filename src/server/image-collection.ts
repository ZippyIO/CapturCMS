'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';

export async function getAllUserImageCollections() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const collections = await db.imageCollection.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return collections;
  }
}
