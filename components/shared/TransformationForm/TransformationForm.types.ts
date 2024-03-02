export enum TransformationFormSchemaNames {
  title = 'title',
  aspectRatio = 'aspectRatio',
  color = 'color',
  prompt = 'prompt',
  publicId = 'publicId',
  from = 'from',
  to = 'to',
}

export type CloudinaryImage = {
  aspectRatio: string;
  height: number;
  publicId: string;
  secureURL: string;
  width: number;
  from: string;
  to: string;
};
