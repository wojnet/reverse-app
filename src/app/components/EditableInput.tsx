"use client"
import { cn } from '@/utils/cn';
import { FC, useEffect, useRef, useState } from 'react';

interface EditableInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAccept: () => void;
}

const EditableInput: FC<EditableInputProps> = ({ 
    className,
    value,
    onChange,
    onAccept,
    ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleOnParagraphClick = () => {
    setIsEditing(true);
  }

  const handleOnAccept = () => {
    if (value) {
      onAccept();
      setIsEditing(false);
    }
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleOnAccept();
  }

  useEffect(() => {
    if (isEditing) {
      if (inputRef !== null) {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
  }, [isEditing]);

  if (!isEditing) return (
    <p
      className="cursor-pointer text-sm hover:outline-dashed hover:outline hover:outline-1 rounded-xl p-[2px_8px] transition"
      onClick={handleOnParagraphClick}
    >
      {value}
    </p>
  );

  return (
    <section className="flex items-center gap-2">
      <input
        className={cn("custom-input", "font-mono text-sm", className)}
        value={value}
        onChange={onChange}
        onKeyDown={handleOnKeyDown}
        ref={inputRef}
        placeholder="name cannot be empty"
        {...props}
      />
      <button
        className="text-sm hover:scale-95 transition"
        onClick={handleOnAccept}
      >
        ✅
      </button>
    </section>
  );
}

export default EditableInput;