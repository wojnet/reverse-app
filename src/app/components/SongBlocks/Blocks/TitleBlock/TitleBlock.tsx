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
    <div className="w-full max-w-[700px] flex flex-col items-center gap-2 outline outline-1 outline-app-outline rounded-lg p-5 relative">
      <BlockOptionList>
        <BlockOption
          onClick={() => dispatch(removeBlock(index))}
          confirm={true}
          icon="trash"
        />
        <BlockOption icon="duplicate" />
        <BlockOption icon="menu" />
      </BlockOptionList>
      <input
        className="text-input text-3xl font-sans"
        type="text"
        placeholder='title'
        value={title}
        onChange={handleOnChangeTitle}
        spellCheck={false}
      />
      <input
        className="text-input"
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
      <h1 className="text-3xl font-sans">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default TitleBlock;