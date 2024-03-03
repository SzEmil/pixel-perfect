import React from 'react';
import { CustomField } from './CustomField';
import { Input } from '@/components/ui/input';
import { TransformationFormSchemaNames } from '../TransformationForm.types';

type RemoveAndRecolorFieldsProps = {
  form: any;
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => void;
  type: string;
};

export const RemoveAndRecolorFields = ({
  type,
  form,
  onInputChangeHandler,
}: RemoveAndRecolorFieldsProps) => {
  return (
    <div className="prompt-field">
      <CustomField
        control={form.control}
        name={TransformationFormSchemaNames.prompt}
        formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
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
  );
};
