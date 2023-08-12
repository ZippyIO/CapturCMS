'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '~/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~/components/ui/Form';
import { Input } from '~/components/ui/Input';
import { Textarea } from '~/components/ui/Textarea';
import {
  type CreateImageCollectionPayload,
  ImageCollectionValidator,
} from '~/lib/validators/image-collection';

const FormSchema = ImageCollectionValidator.omit({ userId: true });
type FormValues = z.infer<typeof FormSchema>;

const ImageCollectionForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: CreateImageCollectionPayload = {
      name: values.name,
      description: values.description?.length ?? 0 > 0 ? values.description : undefined,
    };

    const res = await fetch('/api/collection/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return res;
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ImageCollectionForm;
