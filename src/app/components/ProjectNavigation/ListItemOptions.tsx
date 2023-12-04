"use client";
import { FC, useState } from 'react';

type ListItemOptionsProps = {};

const ListItemOptions: FC<ListItemOptionsProps> = ({}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // const handleOnFocus = (event: any) => {
  //   setIsOpen(true);
  // }

  // const handleOnBlur = (event: any) => {
  //   setIsOpen(false);
  // }

  return (
    <>
      <button
        // onClick={() => {}}
        // onFocus={handleOnFocus}
        // onBlur={handleOnBlur}
      >
          ⚙️
      </button>
    </>
  );
}

export default ListItemOptions;