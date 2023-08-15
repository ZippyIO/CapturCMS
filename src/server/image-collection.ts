'use server';

import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';
import {
  type ImageCollectionImage,
  ImageCollectionValidator,
} from '~/lib/validators/image-collection';

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

export async function getImageCollection(id: string, allImages = true) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    const collection = await db.imageCollection.findUnique({
      where: {
        id: id,
      },
      include: {
        images: {
          take: allImages ? undefined : 1,
        },
      },
    });

    return collection;
  }
}

export async function createImageCollection(data: {
  name: string;
  description?: string;
  images: ImageCollectionImage[];
}) {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const { userId, name, description, images } = ImageCollectionValidator.parse({
      userId: session.user.id,
      name: data.name,
      description: data.description,
      images: data.images,
    });

    const collection = await db.imageCollection.create({
      data: {
        userId: userId,
        name: name,
        description: description,
        images: {
          connectOrCreate: images.map((image) => ({
            where: {
              fileKey: image.fileKey,
            },
            create: {
              userId: userId,
              name: image?.name,
              description: image?.description,
              fileName: image.fileName,
              fileSize: image.fileSize,
              fileKey: image.fileKey,
              fileUrl: image.fileUrl,
            },
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return collection;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message);
    }

    throw new Error('Could not create Image Collection, please try again later');
  }
}
