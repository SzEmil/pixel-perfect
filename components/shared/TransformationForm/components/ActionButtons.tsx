import { Button } from '@/components/ui/button';

type ActionButtonsProps = {
  isTransforming: boolean;
  isSubmitting: boolean;
  onTransformHandler: () => Promise<void>;
  newTransformation: Transformations | null;
  image: CloudinaryImage | null;
  transformationPrice: number;
};

export const ActionButtons = ({
  isSubmitting,
  isTransforming,
  onTransformHandler,
  newTransformation,
  image,
  transformationPrice,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        className="submit-button capitalize"
        type="button"
        disabled={isTransforming || newTransformation === null}
        onClick={onTransformHandler}
      >
        {isTransforming
          ? 'Transforming data...'
          : `Apply transformation for ${transformationPrice} credits`}
      </Button>

      <Button
        className="submit-button capitalize"
        type="submit"
        disabled={isSubmitting || !image}
      >
        {isSubmitting ? 'Submitting data...' : 'Save image'}
      </Button>
    </div>
  );
};
