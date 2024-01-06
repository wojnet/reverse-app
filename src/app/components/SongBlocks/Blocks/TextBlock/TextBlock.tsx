"use client";
import { ChangeEvent, FC, KeyboardEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { TextBlockDataType } from '@/types/song';
import BlockOptionList from '../../Functionality/BlockOptionList';
import BlockOption from '../../Functionality/BlockOption';
import { Dispatch } from '@reduxjs/toolkit';
import { changeBlock, moveBlock, removeBlock } from '@/app/features/song/songSlice';
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
  const [lastPressedKey, setLastPressedKey] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleChangeBlock = (lines: string[]) => {
    dispatch(changeBlock({ index, changedBlockData: {
      paragraphs: lines.map((line, index) => {
        return {
          ...paragraphs[index],
          text: line,
        }
      }),
    }}));
  }

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const lines = event.target.value.split("\n");

    switch (lastPressedKey) {
      case "Enter":
        console.log("ENTER!!!!");
        handleChangeBlock(lines);
        break;
      default:
        handleChangeBlock(lines);
        break;
    }
    
  }

  const handleOnKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    setLastPressedKey(event.code);
  }

  const resizeTextArea = (ref: RefObject<HTMLTextAreaElement>) => {
    if (ref.current !== null) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }

  useEffect(() => resizeTextArea(textareaRef), [paragraphs, editMode]);

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
          dispatch={dispatch}
        />
      );
    });

    return (
      // EDITABLE TEXT_BLOCK
      <div className="sheet-block w-full h-auto flex flex-col items-center gap-5 outline outline-1 outline-sheet-outline rounded-lg p-5 relative">
        <h1 className="absolute text-sm left-2 top-[-12px] bg-sheet-background">
          TEXT BLOCK
        </h1>
        <BlockOptionList>
          <BlockOption
            onClick={() => dispatch(moveBlock({ index, newIndex: index - 1 }))} 
            confirm={true}
            icon="upArrow" 
          />
          <BlockOption
            onClick={() => dispatch(moveBlock({ index, newIndex: index + 1 }))} 
            confirm={true}
            icon="downArrow" 
          />
          <BlockOption
            onClick={() => dispatch(removeBlock(index))}
            confirm={true}
            icon="trash" 
          />
        </BlockOptionList>
        { editableChordLines }
        <textarea
          className="invisible-textarea font-mono w-full h-auto leading-[48px] resize-none"
          placeholder="write your song's lyrics here..."
          value={textareaValue}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          spellCheck={false}
          wrap="off"
          ref={textareaRef}
        />
      </div>
    );
  }

  const paragraphElements = paragraphs?.map((paragraph, index) => {
    return <p
      className="font-mono leading-[48px] whitespace-nowrap"
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
    <div className="sheet-block w-full h-auto flex flex-col items-start gap-5 rounded-lg p-5 relative">
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