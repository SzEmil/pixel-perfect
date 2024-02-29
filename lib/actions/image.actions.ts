'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../database/mongoose';
import { handleError } from '../utils';
import User from '../database/models/user.model';
import Image from '../database/models/image.model';
import { redirect } from 'next/navigation';
import { Routes } from '@/constants/endpoints';
import { v2 as cloudinary } from 'cloudinary';

const populateUser = (query: any) =>
  query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName',
  });

export const addImage = async ({ image, userId, path }: AddImageParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error(`User ${author} not found`);
    }

    const newImage = await Image.create({ ...image, author: author._id });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (e) {
    handleError(e);
  }
};

export const updateImage = async ({
  image,
  userId,
  path,
}: UpdateImageParams) => {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error(`Image ${image._id} not found`);
    }
    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (e) {
    handleError(e);
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (e) {
    handleError(e);
  } finally {
    redirect(Routes.dashboard);
  }
};

export const getImageById = async (imageId: string) => {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if (!image) {
      throw new Error('Image not found');
    }
    return JSON.parse(JSON.stringify(image));
  } catch (e) {
    handleError(e);
  }
};

type ImagesQueryParams = {
  limit?: number;
  page: number;
  searchQuery?: string;
};
export const getAllImages = async ({
  limit = 9,
  page = 1,
  searchQuery = '',
}: ImagesQueryParams) => {
  try {
    await connectToDatabase();
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = 'folder=pixel-perfect';

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }
    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourcesIds = resources.map((resource: any) => resource.public_id);

    let query = {};
    if (searchQuery) {
      query = {
        publicIds: {
          $in: resourcesIds,
        },
      };
    }

    const skipAmount = (+page - 1) * limit;

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find(query).countDocuments();
    const savedImages = await Image.find().countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    };
  } catch (e) {
    handleError(e);
  }
};
