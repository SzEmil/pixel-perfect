import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { DeleteConfirmation } from '../DeleteConfirmation/DeleteConfirmation';
import { auth } from '@clerk/nextjs';

type EditMediaProps = {
  mediaId: string;
  authorId: {
    _id: string;
  };
  mediaName: string;
};

export const EditMedia = async ({
  mediaId,
  authorId,
  mediaName,
}: EditMediaProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const user = await getCurrentUser(userId);
  return (
    authorId &&
    user._id === authorId._id && (
      <div className="mt-4 space-y-4">
        <Button asChild type="button" className="submit-button capitalize">
          <Link href={`${Routes.transformationsImage}/${mediaId}/update`}>
            Update Pixel
          </Link>
        </Button>

        <DeleteConfirmation mediaId={mediaId} mediaName={mediaName} />
      </div>
    )
  );
};
