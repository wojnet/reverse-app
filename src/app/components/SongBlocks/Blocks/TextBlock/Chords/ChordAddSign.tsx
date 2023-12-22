import { FC } from 'react';

interface ChordAddSignProps {
  x: number,
  y: number,
  isVisible: boolean,
}

const ChordAddSign: FC<ChordAddSignProps> = ({
  x,
  y,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div
      style={{ left: x, top: y }}
      className="w-2 h-2 flex justify-center items-center fixed z-20"
    >
      +
    </div>
  );
}

export default ChordAddSign;