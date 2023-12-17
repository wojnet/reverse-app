import { FC, useRef } from 'react';
import { ChordsType } from '@/types/song';
import chordShapeToSymbol from '@/utils/chordShapeToSymbol';

interface ChordLineProps {
  index: number,
  paragraph: { text: string, chords?: ChordsType[] }
  blockIndex: number,
  width: number,
  lineHeight: number,
  letterWidth: number,
  devMode: boolean,
}

const ChordLine: FC<ChordLineProps> = ({
  index,
  paragraph,
  blockIndex,
  width,
  lineHeight,
  letterWidth,
  devMode,
}) => {
  const chordLineRef = useRef<HTMLDivElement>(null);
  
  const chordElements = paragraph.chords?.map((chord, index) => {
    return (
      <div
        key={index}
        style={{ left: `${(chord.position * letterWidth) - 20}px` }}
        className="w-0 h-full flex justify-start items-center rounded-md absolute"
      >
        <p className="text-xs bg-gradient-to-r from-blue-600 to-blue-500 font-bold px-1 rounded-md [text-shadow:_0_0_4px_#000A] fixed select-none">
          { chord.rootNote }
          { chordShapeToSymbol(chord.shape) }
        </p>
      </div>
    ); 
  });

  return (
    <div
      style={{ width: `${(width * letterWidth)}px`, outline: devMode ? "1px solid green" : "none", top: `${18+index*lineHeight}px` }}
      className="h-4 flex items-center gap-3 rounded-sm absolute left-[30px] overflow-hidden cursor-pointer"
    >
      { chordElements }
      { devMode && <code className="text-[10px] m-0 whitespace-nowrap mx-1">
        { blockIndex }-{ index }
      </code> }
    </div>
  );
}

export default ChordLine;