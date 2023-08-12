'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';

export async function getAllUserImages() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const images = await db.image.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return images;
  }
}
