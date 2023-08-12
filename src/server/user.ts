'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';

export const getUser = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const user = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (user) {
      return user;
    }
  }
};
