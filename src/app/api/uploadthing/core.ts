import { getToken } from 'next-auth/jwt';
import { createUploadthing, type FileRouter as UtFileRouter } from 'uploadthing/next';

import db from '~/lib/db';

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req });
      if (!token?.sub) throw new Error('Unauthorized');

      return { userId: token.sub };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.image.create({
        data: {
          userId: metadata.userId,
          fileName: file.name,
          fileSize: file.size,
          fileKey: file.key,
          fileUrl: file.url,
        },
      });
    }),
} satisfies UtFileRouter;

export type FileRouter = typeof fileRouter;
