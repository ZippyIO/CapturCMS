import { z } from 'zod';

export const ImageCollectionValidator = z.object({
  userId: z.string().min(1),
  name: z.string().min(1).max(128),
  description: z.string().optional(),
});

export const ImageCollectionUpdateValidator = z.object({
  imageId: z.string().min(1),
  collectionId: z.string().min(1),
});

export type ImageCollection = z.infer<typeof ImageCollectionValidator>;
export type CreateImageCollectionPayload = Omit<z.infer<typeof ImageCollectionValidator>, 'userId'>;

export type ImageCollectionUpdate = z.infer<typeof ImageCollectionUpdateValidator>;
