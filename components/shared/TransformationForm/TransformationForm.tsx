'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  aspectRatioOptions,
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
import { useState } from 'react';
import { TransformationFormSchemaNames } from './TransformationForm.types';
import { AspectRatioKey, deepMergeObjects } from '@/lib/utils';
import { debounce } from 'lodash';
import { useTransition } from 'react';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export const TransformationForm = ({
  type,
  action,
  data = null,
  userId,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
            : 'to']: value,
        },
      }));
      return onChangeField(value);
    }, 1000);
  };

  const onTransformHandler = async () => {
    setisTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );
    setNewTransformation(null);

    startTransition(async () => {
      // await updateCredits(userId, creditFee)
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="flex flex-col gap-4">
          <Button
            className="submit-button capitalize"
            type="button"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming data...' : 'Apply transformation'}
          </Button>

          <Button
            className="submit-button capitalize"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting data...' : 'Save image'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
