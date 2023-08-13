'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Image, type ImageCollection } from '@prisma/client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/Dialog';
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
import { type UpdateImagePayload } from '~/lib/validators/image';

const FormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  collectionId: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  image: Image;
  collections: ImageCollection[];
}

const ImageEditModal = ({ image, collections }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: image.name ?? '',
      description: image.description ?? '',
      collectionId: image.collectionId ?? undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: UpdateImagePayload = {
      id: image.id,
      name: values.name?.length ?? 0 > 0 ? values.name : null,
      description: values.description?.length ?? 0 > 0 ? values.description : null,
      collectionId: values.collectionId,
    };

    await fetch('/api/image/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(() => setOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute right-4 top-4 bg-zinc-900/50 transition-transform hover:bg-zinc-950/50 active:scale-95">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="bg-blue-600 transition-transform hover:bg-blue-600 active:scale-95"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditModal;
