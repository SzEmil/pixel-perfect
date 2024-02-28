import { transformationTypes } from '@/constants';

interface TransformationType {
  type: string;
  title: string;
  subTitle: string;
  config: any;
  icon: string;
}
export const getImageTransformations = (): string[] => {
  const types: string[] = [];
  for (const key in transformationTypes) {
    types.push(
      (transformationTypes as Record<string, TransformationType>)[key].type
    );
  }
  return types;
};
