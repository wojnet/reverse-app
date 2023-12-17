import { FC } from 'react';
import BlockOptionList from '../../Functionality/BlockOptionList';
import BlockOption from '../../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { removeBlock } from '@/app/features/song/songSlice';

interface TitleBlockProps {
  index: number,
  title?: string,
  subtitle?: string,
  editMode: boolean,
  dispatch: Dispatch,
}

const TitleBlock: FC<TitleBlockProps> = ({
  index,
  title,
  subtitle,
  editMode,
  dispatch,
}) => {
  if (editMode) return (
    <div className="w-full max-w-[700px] flex flex-col items-center gap-2 outline outline-1 outline-app-outline rounded-lg p-5 relative">
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))}
          icon="trash"
        />
        <BlockOption icon="duplicate" />
        <BlockOption icon="menu" />
      </BlockOptionList>
      <h1 className="text-3xl font-sans">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-2 hover:outline hover:outline-2 hover:outline-app-outline rounded-lg p-5 relative">
      <h1 className="text-3xl font-sans">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default TitleBlock;