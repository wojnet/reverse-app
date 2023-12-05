import { FC } from 'react';

interface TitleBlockProps {
  title?: string;
  subtitle?: string;
  editMode: boolean;
}

const TitleBlock: FC<TitleBlockProps> = ({
  title,
  subtitle,
  editMode,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 hover:outline hover:outline-1 hover:outline-slate-300 rounded-lg p-5">
      <h1 className="text-3xl italic">{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default TitleBlock;