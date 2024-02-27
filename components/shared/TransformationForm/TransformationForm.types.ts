export enum TransformationFormSchemaNames {
  title = 'title',
  aspectRatio = 'aspectRatio',
  color = 'color',
  prompt = 'prompt',
  publicId = 'publicId',
}

export type CloudinaryImage = {
  aspectRatio: string;
  height: number;
  publicId: string;
  secureURL: string;
  width: number;
};
