'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from '@/constants';
import { CustomField } from './components/CustomField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { TransformationFormSchemaNames } from './TransformationForm.types';
import { AspectRatioKey, deepMergeObjects } from '@/lib/utils';
import { debounce } from 'lodash';
import { useTransition } from 'react';
import { MediaUploader } from '../MediaUploader/MediaUploader';
import { TransformedImage } from '../TransformedImage.tsx/TransformedImage';
import { updateCredits } from '@/lib/actions/user.actions';
import { getCldImageUrl } from 'next-cloudinary';
import { addImage, updateImage } from '@/lib/actions/image.actions';
import { Routes } from '@/constants/endpoints';
import { useRouter } from 'next/navigation';
import { InsufficientCredditsModal } from '../InsufficientCreditsModal/InsufficientCredditsModal';
import { ActionButtons } from './components/ActionButtons';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const TransformationForm = ({
  type,
  action,
  data = null,
  userId,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  //TODO: Optimize this component
  const router = useRouter();
  const transformationType = transformationTypes[type];

  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setisTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => string
  ) => {
    const currentImageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: currentImageSize.aspectRatio,
      width: currentImageSize.width,
      height: currentImageSize.height,
    }));
    setNewTransformation(transformationType.config);

    return onChangeField(value);
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
          <CustomField
            control={form.control}
            name={TransformationFormSchemaNames.aspectRatio}
            render={({ field }) => (
              <Select
                onValueChange={value =>
                  onSelectFieldHandler(value, field.onChange)
                }
                value={field.value}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map(key => (
                    <SelectItem key={key} value={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === 'remove' || type === 'recolor') && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name={TransformationFormSchemaNames.prompt}
              formLabel={
                type === 'remove' ? 'Object to remove' : 'Object to recolor'
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={e =>
                    onInputChangeHandler(
                      'prompt',
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name={TransformationFormSchemaNames.color}
                formLabel="Replacement color"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={e =>
                      onInputChangeHandler(
                        'color',
                        e.target.value,
                        'recolor',
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        {/* replace */}

        {type === 'replace' && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name={TransformationFormSchemaNames.from}
              formLabel={'Object to replace'}
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={e => {
                    return onInputChangeHandler(
                      'from',
                      e.target.value,
                      type,
                      field.onChange
                    );
                  }}
                />
              )}
            />

            <CustomField
              control={form.control}
              name={TransformationFormSchemaNames.to}
              formLabel="Object to create"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={e =>
                    onInputChangeHandler(
                      'to',
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name={TransformationFormSchemaNames.publicId}
            className="flex size-full flex-col w-[100%]"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                publicId={field.value}
                image={image}
                type={type}
                setImage={setImage}
                userId={userId}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setisTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <ActionButtons
          {...{
            isSubmitting,
            isTransforming,
            image,
            onTransformHandler,
            newTransformation,
          }}
          transformationPrice={transformationType.price}
        />
      </form>
    </Form>
  );
};
