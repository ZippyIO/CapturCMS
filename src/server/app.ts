'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';

export async function getApp() {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const app = await db.app.findUnique({
      where: {
        id: '1',
      },
    });

    return app;
  } catch (error) {
    throw new Error('Could not get App, please try again later');
  }
}

export async function editApp(data: { public: boolean }) {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const app = await db.app.update({
      where: {
        id: '1',
      },
      data: {
        public: data.public,
      },
    });

    return app;
  } catch (error) {
    throw new Error('Could not edit App, please try again later');
  }
}
