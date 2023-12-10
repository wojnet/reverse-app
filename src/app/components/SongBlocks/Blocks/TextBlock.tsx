import { FC } from 'react';
import { TextBlockDataType } from '@/types/song';
import BlockOptionList from '../Functionality/BlockOptionList';
import BlockOption from '../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { removeBlock } from '@/app/features/song/songSlice';

interface TextBlockProps extends TextBlockDataType {
  index: number,
  editMode: boolean,
  dispatch: Dispatch,
};

const TextBlock: FC<TextBlockProps> = ({
  index,
  paragraphs,
  editMode,
  dispatch,
}) => {
  const paragraphElements = paragraphs?.map((paragraph, index) => {
    return <p key={index}>{paragraph.text}</p>;
  })

  if (editMode) return (
    <div className="w-full max-w-[700px] flex flex-col items-center gap-5 outline outline-1 outline-app-outline rounded-lg p-5 relative">
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))}
          icon="trash" 
        />
        <BlockOption icon="duplicate" />
        <BlockOption icon="menu" />
      </BlockOptionList>
      { paragraphElements }
    </div>
  );
  
  return (
    <div className="w-full flex flex-col items-center gap-5 hover:outline hover:outline-2 hover:outline-app-outline rounded-lg p-5 relative">
      { paragraphElements }
    </div>
  );
}

export default TextBlock;