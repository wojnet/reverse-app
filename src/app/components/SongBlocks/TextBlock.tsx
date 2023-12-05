import { FC } from 'react';
import { TextBlockDataType } from '@/types/song';

interface TextBlockProps extends TextBlockDataType {
  editMode: boolean;
};

const TextBlock: FC<TextBlockProps> = ({
  paragraphs,
  editMode,
}) => {
  const paragraphElements = paragraphs?.map((paragraph, index) => {
    return <p key={index}>{paragraph.text}</p>;
  })
  
  return (
    <div className="w-full flex flex-col items-center gap-5 hover:outline hover:outline-1 hover:outline-slate-300 rounded-lg p-5">
      { paragraphElements }
    </div>
  );
}

export default TextBlock;