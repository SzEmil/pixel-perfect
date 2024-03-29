import { IoMdHome } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { TbPigMoney } from 'react-icons/tb';
import { FaVideo } from 'react-icons/fa';
import { IoMdImage } from 'react-icons/io';
import { FaFill } from 'react-icons/fa';
import { RiQrScanFill } from 'react-icons/ri';
import { MdMovieFilter } from 'react-icons/md';
import { MdFilterHdr } from 'react-icons/md';
import { LuImage } from 'react-icons/lu';
import { RiImageEditFill } from 'react-icons/ri';
import { IconBaseProps, IconType } from 'react-icons/lib';
import { ComponentClass, FunctionComponent } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { WiStars } from 'react-icons/wi';
import { GiStarSwirl } from 'react-icons/gi';
import { GiKnockedOutStars } from 'react-icons/gi';
import { GiTwoCoins } from 'react-icons/gi';

type IconName =
  | 'IoMdHome'
  | 'FaUser'
  | 'TbPigMoney'
  | 'FaVideo'
  | 'IoMdImage'
  | 'FaFill'
  | 'RiQrScanFill'
  | 'MdMovieFilter'
  | 'MdFilterHdr'
  | 'LuImage'
  | 'RiImageEditFill'
  | 'LuImagePlus'
  | 'WiStars'
  | 'GiStarSwirl'
  | 'GiKnockedOutStars'
  | 'GiTwoCoins';

export const getIcon = (
  iconName: IconName | string
):
  | string
  | FunctionComponent<IconBaseProps>
  | ComponentClass<IconBaseProps, any> => {
  switch (iconName) {
    case 'IoMdHome':
      return IoMdHome;
    case 'FaUser':
      return FaUser;
    case 'TbPigMoney':
      return TbPigMoney;
    case 'FaVideo':
      return FaVideo;
    case 'IoMdImage':
      return IoMdImage;
    case 'FaFill':
      return FaFill;
    case 'RiQrScanFill':
      return RiQrScanFill;
    case 'MdMovieFilter':
      return MdMovieFilter;
    case 'MdFilterHdr':
      return MdFilterHdr;
    case 'LuImage':
      return LuImage;
    case 'RiImageEditFill':
      return RiImageEditFill;
    case 'LuImagePlus':
      return LuImagePlus;
    case 'WiStars':
      return WiStars;
    case 'GiStarSwirl':
      return GiStarSwirl;
    case 'GiKnockedOutStars':
      return GiKnockedOutStars;
    case 'GiTwoCoins':
      return GiTwoCoins;
    default:
      return '';
  }
};
