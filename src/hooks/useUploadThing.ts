import { generateReactHelpers } from '@uploadthing/react/hooks';

import { type FileRouter } from '~/app/api/uploadthing/core';

const { useUploadThing } = generateReactHelpers<FileRouter>();

export default useUploadThing;
