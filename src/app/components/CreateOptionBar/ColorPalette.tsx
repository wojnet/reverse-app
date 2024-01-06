import { changeColor, selectColors } from '@/app/features/song/songSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ColorType } from '@/types/song';
import { ChangeEvent, FC } from 'react';

type ColorPaletteProps = {
  
}

const ColorPalette: FC<ColorPaletteProps> = ({}) => {
  const dispatch = useAppDispatch();

  const chordColor = useAppSelector(selectColors)?.chord || "#5b65eb";

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>, changedPart: ColorType) => {
    dispatch(changeColor({ changedPart, color: event.target.value }));
  }

  return (
    <div
      className="absolute min-w-24 w-auto flex flex-col items-center gap-2 bg-app-lighter-gray p-2 rounded-lg shadow-xl top-0 left-7"
    >
      <p className="text-sm">GLOBAL&nbsp;COLORS</p>
      <section className="flex items-center gap-2">
        <code className="text-sm opacity-80">CHORDS</code>
        <input
          type="color"
          value={chordColor}
          onChange={(event) => handleOnChange(event, "chord")}
        />
      </section>
    </div>
  );
}

export default ColorPalette;