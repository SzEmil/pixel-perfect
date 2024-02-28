'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Routes } from '@/constants/endpoints';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdCancel } from 'react-icons/md';
import { BiSolidCoinStack } from 'react-icons/bi';

export const InsufficientCredditsModal = () => {
  const router = useRouter();
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <BiSolidCoinStack size={24} className="text-black dark:text-white" />
          <AlertDialogTitle>
            Oh, its looks like you have reached limit of your credits!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Dont worry, you can get more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => router.push(Routes.profile)}
            className="flex gap-2 items-center text-black dark:text-white"
          >
            <MdCancel size={24} /> Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.push(Routes.credits)}
            className="flex gap-2 items-center text-black dark:text-white"
          >
            <MdCancel size={24} />
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
