import { ChangeEvent, FC } from 'react';
import { TextBlockDataType } from '@/types/song';
import BlockOptionList from '../../Functionality/BlockOptionList';
import BlockOption from '../../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { changeBlock, removeBlock } from '@/app/features/song/songSlice';
import { useAppSelector } from '@/hooks/redux';
import { selectDevMode } from '@/app/features/options/optionsSlice';
import EditableChordLine from './Chords/EditableChordLine';
import ChordLine from './Chords/ChordLine';

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
  const letterWidth = 9;
  const lineHeight = 48;

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
    const editableChordLines = paragraphs.map((paragraph, mapIndex) => {
      const width = paragraph.text.length;
  
      return (
        <EditableChordLine
          key={mapIndex}
          index={mapIndex}
          paragraph={paragraph}
          blockIndex={index}
          width={width}
          lineHeight={lineHeight}
          devMode={devMode}
          letterWidth={letterWidth}
        />
      );
    });

    return (
      // EDITABLE TEXT_BLOCK
      <div className="w-full max-w-[700px] h-auto flex flex-col items-center gap-5 outline outline-1 outline-app-outline rounded-lg p-5 relative">
        <BlockOptionList>
          <BlockOption
            onClick={() => dispatch(removeBlock(index))}
            confirm={true}
            icon="trash" 
          />
          <BlockOption icon="duplicate" />
          <BlockOption icon="menu" />
        </BlockOptionList>
        { editableChordLines }
        <textarea
          className="invisible-textarea font-mono w-full h-48 leading-[48px] resize-none"
          placeholder="write your song's lyrics here..."
          value={textareaValue}
          onChange={handleOnChange}
          spellCheck={false}
        />
      </div>
    );
  }

  const paragraphElements = paragraphs?.map((paragraph, index) => {
    return <p
      className="font-mono leading-[48px]"
      key={index}
    >
      {paragraph.text}
    </p>;
  })
  
  const chordLines = paragraphs.map((paragraph, mapIndex) => {
    const width = paragraph.text.length;

    return (
      <ChordLine
        key={mapIndex}
        index={mapIndex}
        paragraph={paragraph}
        blockIndex={index}
        width={width}
        lineHeight={lineHeight}
        devMode={devMode}
        letterWidth={letterWidth}
      />
    );
  });

  return (
    // TEXT_BLOCK
    <div className="w-full max-w-[700px] h-auto flex flex-col items-start gap-5 rounded-lg p-5 relative">
      <div
        className="px-[10px]"
      >
        { paragraphElements }
      </div>
      { chordLines }
    </div>
  );
}

export default TextBlock;