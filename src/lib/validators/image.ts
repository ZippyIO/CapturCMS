import { z } from 'zod';

export const ImageValidator = z.object({
  userId: z.string().min(1),
  collectionId: z.string().optional(),
  name: z.string().max(128).optional(),
  description: z.string().optional(),
  fileName: z.string(),
  fileSize: z.number(),
  fileKey: z.string(),
  fileUrl: z.string(),
});

export const ImageUpdateValidator = z.object({
  id: z.string().nonempty(),
  collectionId: z.string().optional().nullable(),
  name: z.string().max(128).optional().nullable(),
  description: z.string().optional().nullable(),
});

export type Image = z.infer<typeof ImageValidator>;
export type CreateImagePayload = Omit<z.infer<typeof ImageValidator>, 'userId'>;
export type UpdateImagePayload = z.infer<typeof ImageUpdateValidator>;
