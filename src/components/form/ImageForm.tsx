'use client';

import 'react-image-crop/dist/ReactCrop.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { type ImageCollection } from '@prisma/client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import { type z } from 'zod';

import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/Select';
import { Textarea } from '~/components/ui/Textarea';
import useUploadThing from '~/hooks/useUploadThing';
import { cropImage } from '~/lib/image';
import { type CreateImagePayload, ImageValidator } from '~/lib/validators/image';
import { createImage } from '~/server/image';
import { useToast } from '~/hooks/use-toast';

const FormSchema = ImageValidator.pick({ name: true, description: true, collectionId: true });

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  collections: Omit<ImageCollection, 'userId'>[];
}

const ImageForm = ({ collections }: Props) => {
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [storedCrop, setStoredCrop] = useState<PixelCrop>();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      collectionId: undefined,
    },
  });

  const { toast } = useToast();
  const [uploadingText, setUploadingText] = useState('Uploading Image');
  const { isUploading, startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete(res) {
      console.log('Client upload complete', res);
    },
    onUploadProgress(percent) {
      setUploadingText(`Uploading Image - ${percent}%`);
      console.log('Upload progress', percent, '%');
    },
    onUploadError(error) {
      console.log('Upload error', error);
    },
  });

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
    if (!imgFile) return;
    toast({
      title: 'Creating Image - Uploading Image',
      description: 'Please wait while your image is uploaded',
    });

    await uploadImage().then(async (res) => {
      const file = res?.[0];
      if (!file) return;

      const payload: CreateImagePayload = {
        collectionId: values.collectionId,
        name: values.name?.length ?? 0 > 0 ? values.name : undefined,
        description: values.description?.length ?? 0 > 0 ? values.description : undefined,
        fileName: file.name,
        fileSize: file.size,
        fileKey: file.key,
        fileUrl: file.url,
      };

      toast({
        title: 'Creating Image',
        description: 'Please wait while your image is created',
      });

      await createImage(payload).then(() => {
        toast({
          title: `${values.name} Image Created`,
          description: 'Your image has been created',
        });
      });
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Image</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Collection</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Collection" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {collections.map((collection) => (
                          <SelectItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
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
            <div className="flex items-center justify-center">
              {imgSrc && (
                <ReactCrop
                  crop={crop}
                  disabled
                  onChange={(_, percent) => setCrop(percent)}
                  onComplete={(c) => setStoredCrop(c)}
                  className="max-h-[400px]"
                >
                  <img ref={imageRef} src={imgSrc} alt="Crop me" className="rounded-md" />
                </ReactCrop>
              )}
            </div>
            <Button type="submit">{isUploading ? uploadingText : 'Submit'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ImageForm;
