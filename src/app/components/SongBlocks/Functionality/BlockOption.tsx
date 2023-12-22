import { FC, lazy, useState } from 'react';
import Modal from '../../Modal';

const DuplicateIcon = lazy(() => import("../../Icons/DuplicateIcon"));
const MenuIcon = lazy(() => import("../../Icons/MenuIcon"));
const TrashIcon = lazy(() => import("../../Icons/TrashIcon"));

type IconType = "menu" | "trash" | "duplicate";

interface BlockOptionProps {
  icon: IconType;
  confirm?: boolean;
  onClick?: () => any;
}

interface IconWrapperProps {
  children: React.ReactNode;
}

const iconStyle = "w-6 h-6 bg-app-gray text-app-outline flex justify-center items-center hover:outline-app-lighter-outline hover:scale-95 select-none z-10 rounded-md scale-90 sm:scale-100 cursor-pointer";

const BlockOption: FC<BlockOptionProps> = ({
  onClick,
  confirm = false,
  icon
}) => {
  const handleOnClick = () => {
    if (confirm) {
      
    }
    if (onClick) onClick();
  }

  const IconWrapper = ({ children }: IconWrapperProps) => {
    return (
      <div
        className={iconStyle}
        onClick={handleOnClick}
      >
        { children }
      </div>
    );
  } 

  if (icon === "menu") return (
    <IconWrapper>
      <MenuIcon />
    </IconWrapper>
  );

  if (icon === "duplicate") return (
    <IconWrapper>
      <DuplicateIcon />
    </IconWrapper>
  );

  if (icon === "trash") return (
    <IconWrapper>
      <TrashIcon />
    </IconWrapper>
  );

  return null;
}

export default BlockOption;