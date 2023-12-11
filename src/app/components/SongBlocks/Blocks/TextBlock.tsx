import { ChangeEvent, FC, useRef } from 'react';
import { TextBlockDataType } from '@/types/song';
import BlockOptionList from '../Functionality/BlockOptionList';
import BlockOption from '../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { changeBlock, removeBlock } from '@/app/features/song/songSlice';
import { useAppSelector } from '@/hooks/redux';
import { selectDevMode } from '@/app/features/options/optionsSlice';

interface TextBlockProps extends TextBlockDataType {
  index: number,
  editMode: boolean,
  dispatch: Dispatch,
};

const TextBlock: FC<TextBlockProps> = ({
  index,
  paragraphs = [],
  editMode,
  dispatch,
}) => {
  const devMode = useAppSelector(selectDevMode);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  let textareaValue: string = "";

  paragraphs?.forEach((paragraph, index) => {
    textareaValue += paragraph.text;
    if (index < paragraphs.length - 1) {
      textareaValue += "\n";
    }
  });

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const lines = event.target.value.split("\n");
    dispatch(changeBlock({ index, changedBlockData: {
      paragraphs: lines.map((line, index) => {
        return {
          ...paragraphs[index],
          text: line,
        }
      }),
    }}));
  }

  if (editMode) {
    const letterWidth = 9;

    const hitboxElements = paragraphs.map((paragraph, index) => {
      const width = paragraph.text.length;

      return (
        <div
          key={index}
          style={{ width: `${(width * letterWidth)}px`, opacity: devMode ? "1" : "0" }}
          className="h-3 bg-green-500 rounded-sm"
        ></div>
      );
    });

    return (
      <div className="w-full max-w-[700px] h-auto flex flex-col items-center gap-5 outline outline-1 outline-app-outline rounded-lg p-5 relative">
        <BlockOptionList>
          <BlockOption
            onClick={() => dispatch(removeBlock(index))}
            icon="trash" 
          />
          <BlockOption icon="duplicate" />
          <BlockOption icon="menu" />
        </BlockOptionList>
        <div
          className="w-auto h-auto flex flex-col gap-7 absolute left-[30px] top-5"
        >
          { hitboxElements }
        </div>
        <textarea
          className="invisible-textarea font-mono w-full h-48 leading-10 resize-none"
          placeholder="write your song's lyrics here..."
          value={textareaValue}
          onChange={handleOnChange}
        />
      </div>
    );
  }

  const paragraphElements = paragraphs?.map((paragraph, index) => {
    return <p key={index}>{paragraph.text}</p>;
  })
  
  return (
    <div className="w-full flex flex-col items-center gap-5 hover:outline hover:outline-2 hover:outline-app-outline rounded-lg p-5 relative">
      { paragraphElements }
    </div>
  );
}

export default TextBlock;