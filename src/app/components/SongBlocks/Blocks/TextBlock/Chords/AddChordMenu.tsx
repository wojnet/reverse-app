import { addChord } from '@/app/features/song/songSlice';
import { RootNoteType, ShapeType } from '@/types/chords';
import { Dispatch } from '@reduxjs/toolkit';
import { useClickAway } from '@uidotdev/usehooks';
import { ChangeEventHandler, FC, MouseEventHandler, MutableRefObject, useEffect, useState } from 'react';

interface AddChordMenuProps {
  x: number,
  y: number,
  isVisible: boolean,
  close: () => void,
  addChord: ({ rootNote, shape }: { rootNote: RootNoteType, shape: ShapeType }) => void,
}

type OptionsType = {
  rootNote: RootNoteType,
  shape: ShapeType,
}

const rootNotes: RootNoteType[] = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
const shapes: ShapeType[] = [
  "major",
  "minor",
  "augmented",
  "diminished",
  "major 7",
  "dominant 7",
  "augmented 7",
  "dominant 7 b5",
  "minor 7",
  "half diminished",
  "diminished 7",
]

const AddChordMenu: FC<AddChordMenuProps> = ({
  x,
  y,
  isVisible,
  close,
  addChord,
}) => {
  const initialOptionsState: OptionsType = {
    rootNote: "C",
    shape: "major",
  };

  const [options, setOptions] = useState<OptionsType>(initialOptionsState);

  const ref = useClickAway<HTMLDivElement>(close);

  if (!isVisible) return null;

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    addChord({
      rootNote: options.rootNote,
      shape: options.shape,
    });
    close();
  }

  const handleOnSelectRootNoteChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setOptions(prev => {
      return {...prev, rootNote: event.target.value as RootNoteType }
    })
  }

  const handleOnSelectShapeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setOptions(prev => {
      return {...prev, shape: event.target.value as ShapeType }
    })
  }

  return (
    <div
      style={{ left: x, top: y }}
      className="bg-sheet-background flex flex-col items-center gap-2 outline outline-1 outline-app-outline rounded-xl shadow-[0_0_20px_2px] shadow-sheet-shadow fixed z-50 p-2"
      ref={ref}
    >
      <section
        className="flex gap-1 items-start"
      >
        <select
          className="bg-transparent border border-app-outline rounded-md"
          value={options.rootNote}
          onChange={handleOnSelectRootNoteChange}
        >
          { rootNotes.map((note, index) => <option
            className="text-app-lighter-gray"
            key={index}
            value={note}
          >
            {note}
          </option>) }
        </select>
        <select
          className="bg-transparent border border-app-outline rounded-md"
          value={options.shape}
          onChange={handleOnSelectShapeChange}
        >
          { shapes.map((shape, index) => <option
            className="text-app-lighter-gray"
            key={index}
            value={shape}
          >
            {shape}
          </option>) }
        </select>
      </section>
      <button
        className="w-full h-5 text-xs text-sheet-text font-bold outline outline-1 outline-sheet-outline rounded-lg p-[2px_5px] cursor-pointer hover:opacity-75"
        onClick={handleOnClick}
      >
        ADD
      </button>
    </div>
  );
}

export default AddChordMenu;