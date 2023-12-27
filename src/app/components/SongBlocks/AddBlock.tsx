import { FC, useEffect, useRef, useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { BlockType } from '@/types/blocks';
import { Dispatch } from '@reduxjs/toolkit';
import { addBlock } from '@/app/features/song/songSlice';

interface AddBlockProps {
  dispatch: Dispatch;
}

const AddBlock: FC<AddBlockProps> = ({ dispatch }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useClickAway<HTMLUListElement>((event) => {
    if (event.target !== buttonRef.current) setIsOpen(false);
  });
  

  const handleAddingBlock = (type: BlockType) => {
    dispatch(addBlock({ type }));
  }

  const handleOnClick = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div
      className="w-8 h-8 bg-sheet-background flex justify-center items-center text-sheet-outline hover:bg-sheet-outline hover:text-sheet-background text-3xl font-bold outline outline-2 outline-sheet-outline hover:outline-sheet-outline select-none z-10 rounded-md cursor-pointer relative transition"
    >
      <button
        className="absolute top-0 right-0 bottom-0 left-0"
        onClick={handleOnClick}
        ref={buttonRef}
      ></button>
      <p>+</p>
      <ul
        ref={listRef}
        className="absolute text-sheet-outline text-sm text-center scale-0 transition top-[50px] origin-top"
        style={ isOpen ? { transform: "scale(1)" } : { transform: "scale(0)" } }
      >
        <button
          className="hover:opacity-50 transition"
          onClick={() => handleAddingBlock("TITLE_BLOCK")}
        >
          TITLE
        </button>
        <button
          className="hover:opacity-50 transition"
          onClick={() => handleAddingBlock("TEXT_BLOCK")}
        >
          TEXT
        </button>
        <button
          className="hover:opacity-50 transition"
          onClick={() => handleAddingBlock("COMMENT_BLOCK")}
        >
          COMMENT
        </button>
      </ul>
    </div>
  );
}

export default AddBlock;