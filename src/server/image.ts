'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';
import { type Image, ImageValidator } from '~/lib/validators/image';

export async function createImage(data: Omit<Image, 'userId'>) {
  let imageId: string | undefined;
  let success = false;
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const { userId, collectionId, name, description, fileName, fileSize, fileKey, fileUrl } =
      ImageValidator.parse({ userId: session.user.id, ...data });

    const newImage = await db.image.create({
      data: {
        userId: userId,
        collectionId: collectionId,
        name: name,
        description: description,
        fileName: fileName,
        fileSize: fileSize,
        fileKey: fileKey,
        fileUrl: fileUrl,
      },
    });

    imageId = newImage.id;
    success = true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message);
    }

    throw new Error('Could not create Image, please try again later');
  } finally {
    if (success && imageId) {
      revalidatePath('/dashboard/images');
      redirect(`/dashboard/images/id/${imageId}`);
    }
  }
}

export async function getAllUserImages() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const images = await db.image.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        collection: {
          select: {
            name: true,
          },
        },
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

export async function getImageCount() {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const image = await db.image.count();

    return image;
  } catch (error) {
    throw new Error('Could not get Image count, please try again later');
  }
}

export async function getImagesTotalSize() {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const image = await db.image.aggregate({
      _sum: {
        fileSize: true,
      },
    });

    return image._sum.fileSize;
  } catch (error) {
    throw new Error('Could not get Image total size, please try again later');
  }
}
