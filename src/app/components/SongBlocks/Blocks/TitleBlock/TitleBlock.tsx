import { ChangeEvent, FC } from 'react';
import BlockOptionList from '../../Functionality/BlockOptionList';
import BlockOption from '../../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { changeBlock, removeBlock } from '@/app/features/song/songSlice';

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
  const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBlock({ index, changedBlockData: {
      title: event.target.value,
    }}));
  }

  const handleOnChangeSubitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBlock({ index, changedBlockData: {
      subtitle: event.target.value,
    }}));
  }

  if (editMode) return (
    <div className="w-full flex flex-col items-center gap-2 outline outline-1 outline-sheet-outline rounded-lg p-5 relative">
      <h1 className="absolute text-sm left-2 top-[-12px] bg-sheet-background">
        TITLE BLOCK
      </h1>
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))}
          confirm={true}
          icon="trash"
        />
      </BlockOptionList>
      <input
        className="text-input text-4xl font-sans"
        type="text"
        placeholder='title'
        value={title}
        onChange={handleOnChangeTitle}
        spellCheck={false}
      />
      <input
        className="text-input text-lg"
        type="text"
        placeholder="subtitle"
        value={subtitle}
        onChange={handleOnChangeSubitle}
        spellCheck={false}
      />
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-2 rounded-lg p-5 relative">
      <h1 className="text-4xl font-sans">{title}</h1>
      <h2 className="text-lg">{subtitle}</h2>
    </div>
  );
}

export default TitleBlock;