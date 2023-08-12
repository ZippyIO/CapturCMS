import { z } from 'zod';

export const ImageValidator = z.object({
  userId: z.string().min(1),
  collectionId: z.string().uuid().optional(),
  name: z.string().max(128).optional(),
  description: z.string().optional(),
  fileName: z.string(),
  fileSize: z.number(),
  fileKey: z.string(),
  fileUrl: z.string(),
});

export type Image = z.infer<typeof ImageValidator>;
export type CreateImagePayload = Omit<z.infer<typeof ImageValidator>, 'userId' | 'collectionId'>;
