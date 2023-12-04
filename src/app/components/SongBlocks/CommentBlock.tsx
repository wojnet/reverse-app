import { CommentBlockDataType } from '@/types/song';
import { FC } from 'react';

interface CommentBlockProps extends CommentBlockDataType {}

const CommentBlock: FC<CommentBlockProps> = ({
  text
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-5 hover:outline hover:outline-1 hover:outline-slate-300 rounded-lg p-5">
      <p>
        { text }
      </p>
    </div>
  );
}

export default CommentBlock;