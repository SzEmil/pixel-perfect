import { Dispatch, SetStateAction } from 'react';
import { MediaUploader } from '../../MediaUploader/MediaUploader';
import { TransformedImage } from '../../TransformedImage.tsx/TransformedImage';
import { TransformationFormSchemaNames } from '../TransformationForm.types';
import { CustomField } from './CustomField';

type TransformationViewsProps = {
  form: any;
  image: CloudinaryImage | null;
  type: TransformationTypeKey;
  setImage: Dispatch<SetStateAction<CloudinaryImage | null>>;
  userId: string;
  isTransforming: boolean;
  setisTransforming: Dispatch<SetStateAction<boolean>>;
  transformationConfig: Transformations | null;
};

export const TransformationViews = ({
  form,
  image,
  type,
  setImage,
  userId,
  isTransforming,
  setisTransforming,
  transformationConfig,
}: TransformationViewsProps) => {
  return (
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
  );
};
