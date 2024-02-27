import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import { IoMdImage } from "react-icons/io";
import { FaFill } from "react-icons/fa";
import { RiQrScanFill } from "react-icons/ri";
import { MdMovieFilter } from "react-icons/md";
import { MdFilterHdr } from "react-icons/md";
import { LuImage } from "react-icons/lu";
import { RiImageEditFill } from "react-icons/ri";

export const userNavLinks = {
  home: {
    label: 'Home',
    route: '/dashboard',
    icon: IoMdHome,
  },
  profile: {
    label: 'Profile',
    route: '/dashboard/profile',
    icon: FaUser,
  },
  credits: {
    label: 'Buy Credits',
    route: '/dashboard/credits',
    icon: TbPigMoney ,
  },
};

export const imageNavLinks = [
  {
    label: 'Image Restore',
    route: '/dashboard/transformations/image/add/restore',
    icon: IoMdImage,
  },
  {
    label: 'Generative Fill',
    route: '/dashboard/transformations/image/add/fill',
    icon: FaFill,
  },
  {
    label: 'Object Remove',
    route: '/dashboard/transformations/image/add/remove',
    icon: RiQrScanFill ,
  },
  {
    label: 'Object Recolor',
    route: '/dashboard/transformations/image/add/recolor',
    icon: RiImageEditFill,
  },
  {
    label: 'Background Remove',
    route: '/dashboard/transformations/image/add/removeBackground',
    icon: LuImage,
  },
];

export const videoNavigationLinks = [
  {
    label: 'Test video option',
    route: '/dashboard/transformations/video/add/test',
    icon: MdMovieFilter ,
    disabled: true,
  },
];

export const plans = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: '20 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: false,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pro Package',
    icon: '/assets/icons/free-plan.svg',
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: '120 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: 'Premium Package',
    icon: '/assets/icons/free-plan.svg',
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: '2000 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'image.svg',
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'camera.svg',
  },
  fill: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'stars.svg',
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'scan.svg',
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'filter.svg',
  },
};

export const aspectRatioOptions = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
};

export const creditFee = -1;
