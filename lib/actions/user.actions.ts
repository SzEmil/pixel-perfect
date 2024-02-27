'use server';

import { revalidatePath } from 'next/cache';
import User from '../database/models/user.model';
import { connectToDatabase } from '../database/mongoose';
import { handleError } from '../utils';
import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (e) {
    handleError(e);
  }
};

export const getCurrentUser = async () => {
  try {
    await connectToDatabase();
    const { userId } = auth();

    if (!userId) {
      console.error(`User with id ${userId} is not logged in!`);
      redirect(Routes.home);
    }
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error(`User with id: ${userId} not found`);
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    handleError(e);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error(`User with id: ${userId} not found`);
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    handleError(e);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error(`Failed during update user`);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (e) {
    handleError(e);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error(`User with id: ${clerkId} not found`);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath(Routes.dashboard);

    if (!deletedUser) throw new Error(`Failed during delete user`);
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    handleError(e);
  }
};

export const updateCredits = async (userId: string, creditFree: number) => {
  try {
    await connectToDatabase();
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { credits: creditFree } },
      { new: true }
    );
    if (!updatedUserCredits) throw new Error('User credits update failed');

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (e) {
    handleError(e);
  }
};
