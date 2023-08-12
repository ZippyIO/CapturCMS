'use client';

import 'react-image-crop/dist/ReactCrop.css';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import { type z } from 'zod';

import { Button } from '~/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import { Textarea } from '~/components/ui/Textarea';
import useUploadThing from '~/hooks/useUploadThing';
import { cropImage } from '~/lib/image';
import { type CreateImagePayload, ImageValidator } from '~/lib/validators/image';

const FormSchema = ImageValidator.pick({ name: true, description: true });

type FormValues = z.infer<typeof FormSchema>;

const ImageForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { isUploading, startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete(res) {
      console.log('Client upload complete', res);
    },
    onUploadProgress(e) {
      console.log('Upload progress', e);
    },
    onUploadError(e) {
      console.log('Upload error', e);
    },
  });

  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState<Crop>();
  const [storedCrop, setStoredCrop] = useState<PixelCrop>();
  const imageRef = useRef<HTMLImageElement>(null);

  async function uploadImage() {
    if (!imageRef.current || !imgFile) return;

    if (storedCrop) {
      const canvas = cropImage(imageRef.current, storedCrop);
      const blob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((blob) => {
          blob ? res(blob) : rej('No blob');
        });
      });
      const file = new File([blob], 'cropped.png', { type: 'image/png' });

      const image = await startUpload([file]);
      return image;
    } else {
      const image = await startUpload([imgFile]);
      return image;
    }
  }

  async function onSubmit(values: FormValues) {
    console.log('Form values', values);
    if (!imgFile) return;

    const image = await uploadImage()
      .then(async (res) => {
        const file = res?.[0];
        if (!file) return;

        console.log('Upload complete', file);

        const payload: CreateImagePayload = {
          name: values.name?.length ?? 0 > 0 ? values.name : undefined,
          description: values.description?.length ?? 0 > 0 ? values.description : undefined,
          fileName: file.name,
          fileSize: file.size,
          fileKey: file.key,
          fileUrl: file.url,
        };

        const createImage = await fetch('/api/image/create', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        return createImage;
      })
      .catch((e) => {
        console.error(e);
      });

    return image;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormLabel>File</FormLabel>
        <Input
          type="file"
          placeholder="Name"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              setImgSrc(reader.result?.toString() ?? '');
              setImgFile(file);
            });
            reader.readAsDataURL(file);
          }}
        />
        {/* <label className="flex flex-col gap-1">
          Select an image to crop:
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() ?? '');
                setImgFile(file);
              });
              reader.readAsDataURL(file);
            }}
          />
        </label> */}

        <div className="w-full max-w-md space-y-2">
          {imgSrc && (
            <ReactCrop
              crop={crop}
              disabled
              onChange={(_, percent) => setCrop(percent)}
              onComplete={(c) => setStoredCrop(c)}
            >
              <img ref={imageRef} src={imgSrc} alt="Crop me" />
            </ReactCrop>
          )}

          {/* <button
            onClick={() => void uploadImage()}
            disabled={isUploading}
            className="rounded bg-zinc-700 px-4 py-2 text-zinc-100"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button> */}
        </div>
        <Button type="submit">{isUploading ? 'Uploading...' : 'Submit'}</Button>
      </form>
    </Form>
  );
};

export default ImageForm;
