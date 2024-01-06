import { FC } from 'react';

interface MenuIconProps {
  className?: string,
  fill?: string,
  stroke?: string,
}

const MenuIcon: FC<MenuIconProps> = ({ className, fill, stroke, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={fill || "none"}
      stroke={stroke || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="feather feather-menu"
      {...props}
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export default MenuIcon;