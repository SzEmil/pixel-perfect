export const userNavLinks = {
  home: {
    label: 'Home',
    route: '/dashboard',
    icon: 'IoMdHome',
    pro: false
  },
  profile: {
    label: 'Profile',
    route: '/dashboard/profile',
    icon: 'FaUser',
    pro: false
  },
  credits: {
    label: 'Buy Credits',
    route: '/dashboard/credits',
    icon: 'TbPigMoney',
    pro: false
  },
};

export const imageNavLinks = [
  {
    label: 'Image Restore',
    route: '/dashboard/transformations/image/add/restore',
    icon: 'IoMdImage',
    pro: false
  },
  {
    label: 'Generative Fill',
    route: '/dashboard/transformations/image/add/fill',
    icon: 'FaFill',
    pro: false
  },
  {
    label: 'Object Remove',
    route: '/dashboard/transformations/image/add/remove',
    icon: 'RiQrScanFill',
    pro: false
  },
  {
    label: 'Object Recolor',
    route: '/dashboard/transformations/image/add/recolor',
    icon: 'RiImageEditFill',
    pro: false
  },
  {
    label: 'Background Remove',
    route: '/dashboard/transformations/image/add/removeBackground',
    icon: 'LuImage',
    pro: false
  },
  {
    label: 'Object Replace',
    route: '/dashboard/transformations/image/add/replace',
    icon: 'LuImagePlus',
    pro: true
  },
];

export const videoNavigationLinks = [
  {
    label: 'Test video option',
    route: '/dashboard/transformations/video/add/test',
    icon: 'MdMovieFilter',
    disabled: true,
    pro: false
  },
];

export const plans = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 10,
    inclusions: [
      {
        label: '10 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
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
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'IoMdImage',
    price: 2,
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'LuImage',
    price: 2,
  },
  fill: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'FaFill',
    price: 3,
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'RiQrScanFill',
    price: 3,
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'RiImageEditFill',
    price: 5,
  },
  replace: {
    type: 'replace',
    title: 'Object Replace',
    subTitle:
      'Uses generative AI to replace parts of your image with something else.',
    config: {
      replace: { to: '', from: '', preserveGeometry: false },
    },
    icon: 'LuImagePlus',
    price: 8,
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
  from: '',
  to: '',
};

export const creditFee = -1;
