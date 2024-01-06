import { selectColors } from '@/app/features/song/songSlice';
import { useAppSelector } from '@/hooks/redux';
import { ChordsType } from '@/types/song';
import chordShapeToSymbol from '@/utils/chordShapeToSymbol';
import { FC } from 'react';

interface ChordProps {
  index: number,
  paragraphIndex: number,
  blockIndex: number,
  letterWidth: number,
  chord: ChordsType,
}

const Chord: FC<ChordProps> = ({
  index,
  paragraphIndex,
  blockIndex,
  letterWidth,
  chord,
}) => {
  const chordColor = useAppSelector(selectColors)?.chord || "#5b65eb";

  return (
    <div
      key={index}
      style={{
        left: `${(chord.position * letterWidth) - .5*letterWidth}px`,
      }}
      className="w-0 h-full flex justify-start items-center rounded-md absolute"
    >
      <p
        style={{
          background: chordColor,
        }}
        className="text-xs text-sheet-chord-text font-bold px-1 rounded-md absolute select-none"
      >
        { chord.rootNote }
        { chordShapeToSymbol(chord.shape) }
      </p>
    </div>
  );
}

export default Chord;