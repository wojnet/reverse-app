"use client"
import { cn } from '@/utils/cn';
import { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ 
    className,
    value,
    onChange,
    ...props
}) => {
  return (
    <input
    className={cn("custom-input", className)}
    value={value}
    onChange={onChange}
    {...props}
    />
  );
}

export default Input;