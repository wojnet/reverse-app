import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { ChordsType } from '@/types/song';
import EditableChord from './EditableChord';
import ChordAddSign from './ChordAddSign';

interface EditableChordLineProps {
  index: number,
  paragraph: { text: string, chords?: ChordsType[] }
  blockIndex: number,
  width: number,
  lineHeight: number,
  letterWidth: number,
  devMode: boolean,
}

type AddSignType = {
  isVisible: boolean,
  x: number,
  y: number,
};

const EditableChordLine: FC<EditableChordLineProps> = ({
  index,
  paragraph,
  blockIndex,
  width,
  lineHeight,
  letterWidth,
  devMode,
}) => {
  const chordLineRef = useRef<HTMLDivElement>(null);
  const elementTop = chordLineRef.current?.getBoundingClientRect().top || 0;
  const elementLeft = chordLineRef.current?.getBoundingClientRect().left || 0;

  const initialAddSignState: AddSignType = {
    isVisible: false,
    x: 0,
    y: 0,
  }

  const chordPositions = paragraph.chords?.map(({ position }) => {
    return parseInt(`${position}`);
  });

  const [addSign, setAddSign] = useState<AddSignType>(initialAddSignState);

  const chordElements = paragraph.chords?.map((chord, i) => {
    return (
      <EditableChord
        key={i}
        index={i}
        paragraphIndex={index}
        blockIndex={blockIndex}
        chord={chord}
        letterWidth={letterWidth}
      />
    ); 
  });

  const handleOnMouseMoveCapture: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const mousePosition = Math.floor((event.pageX - elementLeft) / letterWidth);

    if (mousePosition < 0 ||
      chordPositions?.includes(mousePosition) ||
      chordPositions?.includes(mousePosition + 1) ||
      chordPositions?.includes(mousePosition - 1)
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

  useEffect(() => {
    return
  }, []);

  return (
    <>
      <ChordAddSign
        isVisible={addSign.isVisible}
        x={addSign.x}
        y={addSign.y}
      />
      <div
        style={{ width: `${(width * letterWidth)}px`, outline: devMode ? "1px solid green" : "none", top: `${18+index*lineHeight}px` }}
        className="h-4 flex items-center gap-3 rounded-sm absolute left-[30px] z-50 cursor-pointer"
        onMouseMoveCapture={handleOnMouseMoveCapture}
        onMouseLeave={handleOnMouseLeave}
        ref={chordLineRef}
      >
        { chordElements }
        { devMode && <code className="text-[10px] m-0 whitespace-nowrap mx-1">
          { blockIndex }-{ index }
        </code> }
      </div>
    </>
  );
}

export default EditableChordLine;