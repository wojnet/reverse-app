import { cn } from '@/utils/cn';
import { FC } from 'react';

interface DownArrowIconProps {
  className?: string,
  fill?: string,
  stroke?: string,
}

const DownArrowIcon: FC<DownArrowIconProps> = ({ className, fill, stroke, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="feather feather-arrow-down"
      {...props}
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

export default DownArrowIcon;