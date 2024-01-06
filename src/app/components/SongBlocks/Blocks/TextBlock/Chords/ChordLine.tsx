import { FC } from 'react';
import { ChordsType } from '@/types/song';
import Chord from './Chord';

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
  const chordElements = paragraph.chords?.map((chord, i) => {
    return (
      <Chord
        key={i}
        index={i}
        paragraphIndex={index}
        blockIndex={blockIndex}
        chord={chord}
        letterWidth={letterWidth}
      />
    ); 
  });

  return (
    <div
      style={{ width: `${(width * letterWidth)}px`, outline: devMode ? "1px solid green" : "none", top: `${18+index*lineHeight}px` }}
      className="h-4 flex items-center gap-3 rounded-sm absolute left-[30px]"
      >
        { chordElements }
      { devMode && <code className="text-[10px] m-0 whitespace-nowrap mx-1">
        { blockIndex }-{ index }
      </code> }
    </div>
  );
}

export default ChordLine;