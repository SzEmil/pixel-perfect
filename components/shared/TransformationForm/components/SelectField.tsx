import { aspectRatioOptions } from '@/constants';
import { AspectRatioKey } from '@/lib/utils';
import { SetStateAction } from 'react';
import { CustomField } from './CustomField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransformationFormSchemaNames } from '../TransformationForm.types';

type SelectFieldProps = {
  setImage: (value: SetStateAction<CloudinaryImage | null>) => void;
  setNewTransformation: (value: SetStateAction<Transformations | null>) => void;
  transformationType: any;
  form: any;
};

export const SelectField = ({
  setImage,
  setNewTransformation,
  transformationType,
  form,
}: SelectFieldProps) => {
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
  return (
    <>
      <CustomField
        control={form.control}
        name={TransformationFormSchemaNames.aspectRatio}
        render={({ field }) => (
          <Select
            onValueChange={value => onSelectFieldHandler(value, field.onChange)}
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
    </>
  );
};
