import { cn } from '@/utils/cn';
import { FC } from 'react';

interface UpArrowIconProps {
  className?: string,
  fill?: string,
  stroke?: string,
}

const UpArrowIcon: FC<UpArrowIconProps> = ({ className, fill, stroke, ...props }) => {
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
      className={cn("feather feather-arrow-up", className)}
      {...props}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default UpArrowIcon;