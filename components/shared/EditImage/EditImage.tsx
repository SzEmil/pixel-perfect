import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { DeleteConfirmation } from '../DeleteConfirmation/DeleteConfirmation';

type EditImageProps = {
  imageId: string;
  authorId: string;
  userId?: string;
};

export const EditImage = ({ imageId, authorId, userId="" }: EditImageProps) => {
  return (
    authorId &&
    userId === authorId && (
      <div className="mt-4 space-y-4">
        <Button asChild type="button" className="submit-button capitalize">
          <Link href={`${Routes.transformationsImage}/${imageId}/update`}>
            Update Image
          </Link>
        </Button>

        <DeleteConfirmation imageId={imageId} />
      </div>
    )
  );
};
