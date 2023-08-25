'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { nextAuthOptions } from '~/lib/auth';
import db from '~/lib/db';
import {
  type ImageCollectionImage,
  ImageCollectionValidator,
} from '~/lib/validators/image-collection';

export async function createImageCollection(data: {
  name: string;
  description?: string;
  images: ImageCollectionImage[];
}) {
  let collectionId: string | undefined;
  let success = false;
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

    collectionId = collection.id;
    success = true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message);
    }

    throw new Error('Could not create Image Collection, please try again later');
  } finally {
    if (success && collectionId) {
      revalidatePath(`/dashboard/collections`);
      redirect(`/dashboard/collections/id/${collectionId}`);
    }
  }
}

export async function editImageCollection(data: {
  id: string;
  name: string;
  description?: string | null;
}) {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const { id, name, description } = ImageCollectionValidator.pick({
      name: true,
    })
      .extend({ id: z.string().nonempty(), description: z.string().optional().nullable() })
      .parse(data);

    const collection = await db.imageCollection.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
    });

    return collection;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.message);
    }

    throw new Error('Could not edit Image Collection, please try again later');
  }
}

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

export async function getAllImageCollectionNames() {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const collectionNames = await db.imageCollection.findMany({
      select: {
        name: true,
      },
    });

    return collectionNames;
  } catch (error) {
    throw new Error('Could not get Image Collection names, please try again later');
  }
}

export async function getImageCollectionCount() {
  try {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const collectionCount = await db.imageCollection.count();

    return collectionCount;
  } catch (error) {
    throw new Error('Could not get Image Collection count, please try again later');
  }
}
