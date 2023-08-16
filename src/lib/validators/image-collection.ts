import { z } from 'zod';

import { ImageValidator } from '~/lib/validators/image';

export const ImageCollectionImageValidator = ImageValidator.extend({
  id: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  collectionId: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const ImageCollectionValidator = z.object({
  userId: z.string().min(1),
  name: z.string().min(1).max(128),
  description: z.string().optional(),
  images: z.array(ImageCollectionImageValidator),
});

export const ImageCollectionUpdateValidator = z.object({
  imageId: z.string().min(1),
  collectionId: z.string().min(1),
});

export type ImageCollectionImage = z.infer<typeof ImageCollectionImageValidator>;
export type ImageCollection = z.infer<typeof ImageCollectionValidator>;
export type CreateImageCollectionPayload = Omit<z.infer<typeof ImageCollectionValidator>, 'userId'>;

export type ImageCollectionUpdate = z.infer<typeof ImageCollectionUpdateValidator>;

export type EditImageCollection = Pick<ImageCollection, 'name'>;
export interface EditImageCollectionPayload extends EditImageCollection {
  id: string;
  description?: string | null;
}
