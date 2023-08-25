'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Image } from '@prisma/client';

import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import { z } from 'zod';

import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/Tabs';
import { Textarea } from '~/components/ui/Textarea';
import { useToast } from '~/hooks/use-toast';
import useUploadThing from '~/hooks/useUploadThing';
import { cropImage } from '~/lib/image';
import {
  type CreateImageCollectionPayload,
  ImageCollectionValidator,
} from '~/lib/validators/image-collection';
import { createImageCollection } from '~/server/image-collection';

const FormSchema = ImageCollectionValidator.omit({ userId: true, images: true }).extend({
  imageName: z.string().max(128).optional(),
  imageDescription: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

interface Props {
  images?: Image[];
}

const ImageCollectionForm = ({ images }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageTab, setImageTab] = useState('existing');

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
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
      imageName: '',
      imageDescription: '',
    },
  });

  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
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

  const onSubmit = async (values: FormValues) => {
    if (imageTab === 'existing' && selectedImage) {
      const payload: CreateImageCollectionPayload = {
        name: values.name,
        description: values.description?.length ?? 0 > 0 ? values.description : undefined,
        images: [selectedImage],
      };

      setIsCreating(true);
      toast({
        title: 'Creating Collection',
        description: 'Please wait while your collection is created',
      });

      const createCollection = await createImageCollection(payload).then(() => {
        setIsCreating(false);
        form.reset();
      });
      return createCollection;
    } else if (imageTab === 'new' && imgFile) {
      toast({
        title: 'Creating Collection - Uploading Image',
        description: 'Please wait while your image is uploaded',
      });

      await uploadImage().then(async (res) => {
        const file = res?.[0];
        if (!file) return;

        const payload: CreateImageCollectionPayload = {
          name: values.name,
          description: values.description?.length ?? 0 > 0 ? values.description : undefined,
          images: [
            {
              name: values.imageName?.length ?? 0 > 0 ? values.imageName : undefined,
              description:
                values.imageDescription?.length ?? 0 > 0 ? values.imageDescription : undefined,
              fileName: file.name,
              fileSize: file.size,
              fileKey: file.key,
              fileUrl: file.url,
            },
          ],
        };

        setIsCreating(true);
        toast({
          title: `Creating Collection`,
          description: 'Please wait while your collection is created',
        });

        await createImageCollection(payload).then(() => {
          toast({
            title: `${values.name} Collection Created`,
            description: 'Your collection has been created',
          });

          setIsCreating(false);
          form.reset();
        });
      });
    }
  };

  const styledDialogImage = (id: string) => {
    return clsx([
      'relative',
      id === selectedImage?.id ? 'border-2 border-blue-500' : 'border-2 border-transparent',
    ]);
  };

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

        <Tabs value={imageTab} onValueChange={setImageTab} className="w-full p-4">
          <TabsList className="w-full rounded-b-none border bg-zinc-800/50">
            <TabsTrigger value="existing" className="w-1/2">
              Existing Image
            </TabsTrigger>
            <TabsTrigger value="new" className="w-1/2">
              New Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="existing" className="mt-0 border">
            <div className="flex h-[500px] flex-col rounded-b-md">
              <div className="flex h-[50px] items-end justify-center">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Choose Header Image</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Choose Image Below</DialogTitle>
                    <div className="columns-4">
                      {images?.map((image) => (
                        <div
                          key={image.id}
                          className={styledDialogImage(image.id)}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img src={image.fileUrl} alt={image.name ?? ''} />
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button variant="secondary" onClick={() => setDialogOpen((prev) => !prev)}>
                        Select
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex h-[450px] items-center justify-center">
                {selectedImage && (
                  <img
                    src={selectedImage.fileUrl}
                    alt={selectedImage.name ?? ''}
                    className="max-h-[430px] rounded-md"
                  />
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="new" className="mt-0 border">
            <div className="flex h-[500px] gap-2 rounded-b-md p-2">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="imageName"
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
                  name="imageDescription"
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
              </div>
              <div className="flex w-1/2 items-center justify-center">
                {imgSrc && (
                  <ReactCrop
                    crop={crop}
                    disabled
                    onChange={(_, percent) => setCrop(percent)}
                    onComplete={(c) => setStoredCrop(c)}
                  >
                    <img
                      ref={imageRef}
                      src={imgSrc}
                      alt="Crop me"
                      className="max-h-[480px] rounded-md"
                    />
                  </ReactCrop>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button type="submit">
          {isUploading ? uploadingText : isCreating ? 'Creating Collection' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default ImageCollectionForm;
