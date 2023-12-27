import { CommentBlockDataType } from '@/types/song';
import { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';
import BlockOptionList from '../../Functionality/BlockOptionList';
import BlockOption from '../../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { changeBlock, removeBlock } from '@/app/features/song/songSlice';

interface CommentBlockProps extends CommentBlockDataType {
  index: number,
  editMode: boolean,
  dispatch: Dispatch,
};

const CommentBlock: FC<CommentBlockProps> = ({
  index,
  text,
  editMode,
  dispatch,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeBlock({ index, changedBlockData: {
      text: event.target.value 
    }}));
  }

  const resizeTextArea = (ref: RefObject<HTMLTextAreaElement>) => {
    if (ref.current !== null) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }

  useEffect(() => resizeTextArea(textareaRef), [text, editMode]);

  if (editMode) return (
    <div className="w-full flex flex-col items-center gap-5 outline outline-1 outline-sheet-outline rounded-lg p-5 relative">
      <h1 className="absolute text-sm left-2 top-[-12px] bg-sheet-background">
        COMMENT BLOCK
      </h1>
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))} 
          confirm={true}
          icon="trash" 
        />
      </BlockOptionList>
      <textarea 
        className="invisible-textarea font-mono w-full h-auto resize-none"
        value={text}
        onChange={handleOnChange}
        spellCheck={false}
        ref={textareaRef}
      />
    </div>
  );

  return (
    <div className="w-3/4 flex flex-col items-start gap-2 rounded-lg p-5 relative">
      { text.split("\n").map((text, index) => <p
        key={index}
        className="font-mono text-sheet-outline"
      >
        {text}
      </p>) }
    </div>
  );
}

export default CommentBlock;