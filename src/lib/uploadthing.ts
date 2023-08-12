import { generateReactHelpers } from '@uploadthing/react/hooks';

import { type FileRouter } from '~/app/api/uploadthing/core';

export const { uploadFiles } = generateReactHelpers<FileRouter>();
