"use client";
import { changeChord, moveChord, removeChord } from '@/app/features/song/songSlice';
import { useAppDispatch } from '@/hooks/redux';
import { ChordsType } from '@/types/song';
import chordShapeToSymbol from '@/utils/chordShapeToSymbol';
import { useClickAway } from '@uidotdev/usehooks';
import { FC, MouseEventHandler, useState } from 'react';

interface EditableChordProps {
  index: number,
  paragraphIndex: number,
  blockIndex: number,
  letterWidth: number,
  chord: ChordsType,
}

const EditableChord: FC<EditableChordProps> = ({
  index,
  paragraphIndex,
  blockIndex,
  letterWidth,
  chord,
}) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const chordRef = useClickAway<HTMLDivElement>(() => {
    setIsModalOpen(false);
  });

  const handleOnClick = () => {
    setIsModalOpen(prev => !prev);
  }

  const handleMoveChord = (n: number) => {
    dispatch(moveChord({
      index,
      paragraphIndex,
      blockIndex,
      number: n,
    }));
  };

  const handleRemoveChord = () => {
    dispatch(removeChord({
      index,
      paragraphIndex,
      blockIndex,
    }));
  };

  const handleOnMouseMoveCapture: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(1);
  }

  return (
    <div
      className="h-full z-50"
      ref={chordRef}
    >
      { isModalOpen && <div
        style={{ left: `${(chord.position * letterWidth) - 20}px` }}
        className="absolute bg-app-gray flex flex-col gap-1 outline outline-1 outline-app-outline rounded-xl shadow-[0_0_20px_2px] shadow-app-gray bottom-5 z-40 p-2"
      >
        <h3 className="text-xs">
          CHORD&nbsp;OPTIONS
        </h3>
        <p className="text-[10px] opacity-70">
          POS {chord.position}
        </p>
        <section className="flex gap-1">
          <button
            className="w-5 h-5 text-xs text-app-text font-bold outline outline-1 outline-app-text rounded-lg p-[2px_5px] cursor-pointer hover:opacity-75"
            onClick={() => handleMoveChord(-1)}
          >
            {"<"}
          </button>
          <button
            className="w-5 h-5 text-xs text-app-text font-bold outline outline-1 outline-app-text rounded-lg p-[2px_5px] cursor-pointer hover:opacity-75"
            onClick={() => handleMoveChord(1)}
          >
            {">"}
          </button>
          <button
            className="w-5 h-5 text-xs text-app-text font-bold outline outline-1 outline-app-text rounded-lg p-[2px_5px] cursor-pointer hover:opacity-75"
            onClick={handleRemoveChord}
          >
            ✕
          </button>
        </section>
      </div> }
      <div
        key={index}
        style={{ left: `${(chord.position * letterWidth) - .5*letterWidth}px`, opacity: isModalOpen ? "0.75" : "" }}
        className="w-0 h-full flex justify-start items-center rounded-md absolute hover:opacity-75 transition"
        onClick={handleOnClick}
      >
        <p
          className="text-xs font-bold px-1 outline outline-1 outline-[#FFF8] outline-offset-[-1px] rounded-md [text-shadow:_0_0_4px_#000A] absolute select-none"
          onMouseMoveCapture={handleOnMouseMoveCapture}
        >
          { chord.rootNote }
          { chordShapeToSymbol(chord.shape) }
        </p>
      </div>
    </div>
  );
}

export default EditableChord;