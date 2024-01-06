import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { ChordsType } from '@/types/song';
import EditableChord from './EditableChord';
import ChordAddSign from './ChordAddSign';
import { Dispatch } from '@reduxjs/toolkit';
import { addChord } from '@/app/features/song/songSlice';
import AddChordMenu from './AddChordMenu';
import { RootNoteType, ShapeType } from '@/types/chords';

interface EditableChordLineProps {
  index: number,
  paragraph: { text: string, chords?: ChordsType[] }
  blockIndex: number,
  width: number,
  lineHeight: number,
  letterWidth: number,
  devMode: boolean,
  dispatch: Dispatch,
}

type AddSignType = {
  isVisible: boolean,
  x: number,
  y: number,
};

type AddChordMenuType = {
  isVisible: boolean,
  position: number,
  x: number,
  y: number,
}

const EditableChordLine: FC<EditableChordLineProps> = ({
  index,
  paragraph,
  blockIndex,
  width,
  lineHeight,
  letterWidth,
  devMode,
  dispatch,
}) => {
  const chordLineRef = useRef<HTMLDivElement>(null);
  const elementTop = chordLineRef.current?.getBoundingClientRect().top || 0;
  const elementLeft = chordLineRef.current?.getBoundingClientRect().left || 0;

  const initialAddSignState: AddSignType = {
    isVisible: false,
    x: 0,
    y: 0,
  }

  const initialAddChordMenuState: AddChordMenuType = {
    isVisible: false,
    position: 0,
    x: 0,
    y: 0,
  }

  const chordPositions = paragraph.chords?.map(({ position }) => {
    return parseInt(`${position}`);
  });

  const [addSign, setAddSign] = useState<AddSignType>(initialAddSignState);
  const [addChordMenu, setAddChordMenu] = useState<AddChordMenuType>(initialAddChordMenuState);

  const chordElements = paragraph.chords?.map((chord, i) => {
    return (
      <EditableChord
        key={i}
        index={i}
        paragraphIndex={index}
        blockIndex={blockIndex}
        chord={chord}
        letterWidth={letterWidth}
        paragraphLength={paragraph.text.length}
      />
    ); 
  });

  const getChordPosition = (pageX: number, elementLeft: number) => {
    return Math.floor((pageX - elementLeft) / letterWidth);
  }

  const handleOnMouseMoveCapture: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const chordPosition = getChordPosition(event.pageX, elementLeft);

    if (chordPosition < 0 ||
      chordPositions?.includes(chordPosition) ||
      chordPositions?.includes(chordPosition + 1) ||
      chordPositions?.includes(chordPosition - 1)
    ) {
      setAddSign(initialAddSignState);
      return;
    }

    const x = elementLeft + Math.floor((event.pageX - elementLeft) / letterWidth) * letterWidth;
    const y = Math.floor(elementTop || 0) - 5;

    setAddSign(prev => {
      return { ...prev, isVisible: true, x, y }
    });
  }

  const handleOnMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
    setAddSign(initialAddSignState);
  }

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const position = getChordPosition(event.pageX, elementLeft);
    if (position < 0 || position >= paragraph.text.length) return;

    const x = elementLeft + Math.floor((event.pageX - elementLeft) / letterWidth) * letterWidth;

    setAddChordMenu({
      isVisible: true,
      x, y: elementTop - 10,
      position,
    });
  }

  const handleAddChord = ({ rootNote, shape, }: {
    rootNote: RootNoteType,
    shape: ShapeType,
  }) => {
    dispatch(addChord({
      paragraphIndex: index,
      blockIndex,
      rootNote,
      shape,
      position: addChordMenu.position,
    }));
  }

  return (
    <>
      <ChordAddSign
        isVisible={addSign.isVisible}
        x={addSign.x}
        y={addSign.y}
      />

      <AddChordMenu
        isVisible={addChordMenu.isVisible}
        x={addChordMenu.x}
        y={addChordMenu.y}
        close={() => setAddChordMenu(initialAddChordMenuState)}
        addChord={handleAddChord}
      />

      <div
        style={{ width: `${(width * letterWidth)}px`, outline: devMode ? "1px solid green" : "none", top: `${18+index*lineHeight}px` }}
        className="h-4 flex items-center gap-3 rounded-sm absolute left-[30px] z-40"
        ref={chordLineRef}
      >
        <div
          className="w-full h-full absolute cursor-pointer"
          onMouseMoveCapture={handleOnMouseMoveCapture}
          onMouseLeave={handleOnMouseLeave}
          onClick={handleOnClick}
        ></div>
        { chordElements }
        { devMode && <code className="text-[10px] m-0 whitespace-nowrap mx-1">
          { blockIndex }-{ index }
        </code> }
      </div>
    </>
  );
}

export default EditableChordLine;