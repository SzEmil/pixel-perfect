import React from 'react';
import { CustomField } from './CustomField';
import { TransformationFormSchemaNames } from '../TransformationForm.types';
import { Input } from '@/components/ui/input';

type ReplaceFieldProps = {
  form: any;
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => void;
  type: string;
};

export const ReplaceField = ({
  form,
  onInputChangeHandler,
  type,
}: ReplaceFieldProps) => {
  return (
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
              onInputChangeHandler('to', e.target.value, type, field.onChange)
            }
          />
        )}
      />
    </div>
  );
};
