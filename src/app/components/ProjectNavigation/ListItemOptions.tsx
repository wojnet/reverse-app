"use client";
import { FC, useState } from 'react';

interface ListItemOptionsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};

const ListItemOptions: FC<ListItemOptionsProps> = ({ ...props }) => {
  return (
    <>
      <button {...props} className="flex-1">
        ☰
      </button>
    </>
  );
}

export default ListItemOptions;