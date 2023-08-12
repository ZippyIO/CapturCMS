import { getToken } from 'next-auth/jwt';
import { createUploadthing, type FileRouter as UtFileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req });
      if (!token?.sub) throw new Error('Unauthorized');

      return { userId: token.sub };
    })
    .onUploadComplete(async () => {
      //
    }),
} satisfies UtFileRouter;

export type FileRouter = typeof fileRouter;
