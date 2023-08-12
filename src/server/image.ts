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

export async function getImage(id: string) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const image = await db.image.findUnique({
      where: {
        id: id,
      },
    });

    return image;
  }
}
