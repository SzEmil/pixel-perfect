import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { defaultValues } from '@/constants';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const useTransformationsForm = (
  data: CloudinaryImage | null,
  action: 'Add' | 'Update'
) => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      data && action === 'Update'
        ? {
            title: data?.title,
            aspectRatio: data?.aspectRatio,
            color: data?.color,
            prompt: data?.prompt,
            publicId: data?.publicId,
          }
        : defaultValues,
  });
};
