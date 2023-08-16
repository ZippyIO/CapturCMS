'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

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
import { Textarea } from '~/components/ui/Textarea';
import {
  type EditImageCollectionPayload,
  ImageCollectionValidator,
} from '~/lib/validators/image-collection';
import { editImageCollection } from '~/server/image-collection';

const FormSchema = ImageCollectionValidator.pick({ name: true, description: true });

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  id: string;
  name: string;
  description?: string;
}

const CollectionEditModal = ({ id, name, description }: Props) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      description: description ?? '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: EditImageCollectionPayload = {
      id: id,
      name: values.name,
      description: values.description?.length ? values.description : null,
    };

    const collection = await editImageCollection(payload).then(() => {
      setOpen(false);
      router.refresh();
    });

    return collection;
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
          <DialogTitle>Edit Collection</DialogTitle>
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

export default CollectionEditModal;
