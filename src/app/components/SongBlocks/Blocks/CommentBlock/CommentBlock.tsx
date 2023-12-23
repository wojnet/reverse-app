import { CommentBlockDataType } from '@/types/song';
import { ChangeEvent, FC, useState } from 'react';
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
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeBlock({ index, changedBlockData: {
      text: event.target.value 
    }}));
  }

  if (editMode) return (
    <div className="w-full max-w-[700px] flex flex-col items-center gap-5 outline outline-1 outline-app-outline rounded-lg p-5 relative">
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))} 
          confirm={true}
          icon="trash" 
        />
        <BlockOption icon="duplicate" />
        <BlockOption icon="menu" />
      </BlockOptionList>
      <textarea 
          className="invisible-textarea font-mono w-full min-h-[24px] leading-[48px] resize-none"
          value={text}
          onChange={handleOnChange}
          spellCheck={false}
        />
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-5 hover:outline hover:outline-2 hover:outline-app-outline rounded-lg p-5 relative">
      <p>
        { text }
      </p>
    </div>
  );
}

export default CommentBlock;