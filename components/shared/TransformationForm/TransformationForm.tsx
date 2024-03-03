'use client';

import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { creditFee, transformationTypes } from '@/constants';
import { CustomField } from './components/CustomField';
import { useEffect, useState, useTransition } from 'react';
import { TransformationFormSchemaNames } from './TransformationForm.types';
import { deepMergeObjects } from '@/lib/utils';
import { debounce } from 'lodash';
import { updateCredits } from '@/lib/actions/user.actions';
import { addImage, updateImage } from '@/lib/actions/image.actions';
import { getCldImageUrl } from 'next-cloudinary';
import { Routes } from '@/constants/endpoints';
import { useRouter } from 'next/navigation';
import { InsufficientCredditsModal } from '../InsufficientCreditsModal/InsufficientCredditsModal';
import { ActionButtons } from './components/ActionButtons';
import { SelectField } from './components/SelectField';
import {
  formSchema,
  useTransformationsForm,
} from '@/hooks/useTransformationsForm';
import { ReplaceField } from './components/ReplaceField';
import { RemoveAndRecolorFields } from './components/RemoveAndRecolorFields';
import { TransformationViews } from './components/TransformationViews';
import { useToast } from '@/components/ui/use-toast';

export const TransformationForm = ({
  type,
  action,
  data = null,
  userId,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const transformationType = transformationTypes[type];

  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [transformationConfig, setTransformationConfig] = useState(config);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setisTransforming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useTransformationsForm(data, action);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (data || image) {
      const transformationURL = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image!.publicId,
        ...transformationConfig,
      });
      const imageData = {
        title: values.title,
        publicId: image!.publicId,
        transformationType: type,
        width: image!.width,
        height: image!.height,
        config: transformationConfig,
        secureURL: image!.secureURL,
        transformationURL,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
        from: values.from,
        to: values.to,
      };

      if (action === 'Add') {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: Routes.dashboard,
          });

          toast({
            title: 'Image Updade',
            description: `${transformationType.price} credit was reduced from your account`,
            duration: 5000,
            className: 'success-toast',
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`${Routes.transformationsImage}/${newImage._id}`);
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (action === 'Update' && data) {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id,
            },
            userId,
            path: `${Routes.transformationsImage}/${data._id}`,
          });

          toast({
            title: 'Image Updade',
            description: `${transformationType.price} credit was reduced from your account`,
            duration: 5000,
            className: 'success-toast',
          });

          if (updatedImage) {
            router.push(`${Routes.transformationsImage}/${updatedImage._id}`);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    setIsSubmitting(false);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === TransformationFormSchemaNames.prompt
            ? 'prompt'
            : fieldName === TransformationFormSchemaNames.from
            ? 'from'
            : 'to']: value,
        },
      }));
    }, 500)();

    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setisTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );
    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, transformationType.price * -1);
    });
  };

  useEffect(() => {
    if (
      image &&
      (type === 'restore' || type === 'removeBackground' || type === 'replace')
    ) {
      setNewTransformation(transformationType.config);
      console.log('setuje transformacje');
    }
  }, [image, transformationType.config, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < Math.abs(creditFee) && <InsufficientCredditsModal />}
        <CustomField
          control={form.control}
          name={TransformationFormSchemaNames.title}
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {type === 'fill' && (
          <SelectField
            {...{ form, setNewTransformation, setImage, transformationType }}
          />
        )}

        {(type === 'remove' || type === 'recolor') && (
          <RemoveAndRecolorFields {...{ type, form, onInputChangeHandler }} />
        )}

        {type === 'replace' && (
          <ReplaceField {...{ type, onInputChangeHandler, form }} />
        )}

        <TransformationViews
          {...{
            form,
            type,
            image,
            isTransforming,
            setImage,
            setisTransforming,
            transformationConfig,
            userId,
          }}
        />

        <ActionButtons
          {...{
            isSubmitting,
            isTransforming,
            image,
            onTransformHandler,
            newTransformation,
          }}
        />
      </form>
    </Form>
  );
};
