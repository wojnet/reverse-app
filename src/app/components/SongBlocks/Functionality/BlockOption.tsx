import { FC, lazy } from 'react';

const DuplicateIcon = lazy(() => import("../../Icons/DuplicateIcon"));
const MenuIcon = lazy(() => import("../../Icons/MenuIcon"));
const TrashIcon = lazy(() => import("../../Icons/TrashIcon"));

type IconType = "menu" | "trash" | "duplicate";

interface BlockOptionProps {
  icon: IconType;
  onClick?: () => any;
}

const iconStyle = "w-6 h-6 bg-app-gray text-app-outline flex justify-center items-center hover:outline-app-lighter-outline hover:scale-95 select-none z-10 rounded-md cursor-pointer";

const BlockOption: FC<BlockOptionProps> = ({ onClick, icon }) => {
  if (icon === "menu") return (
    <div
      className={iconStyle}
      onClick={onClick}
    >
      <MenuIcon />
    </div>
  );

  if (icon === "duplicate") return (
    <div
      className={iconStyle}
      onClick={onClick}
    >
      <DuplicateIcon />
    </div>
  );

  if (icon === "trash") return (
    <div
      className={iconStyle}
      onClick={onClick}
    >
      <TrashIcon />
    </div>
  );

  return null;
}

export default BlockOption;