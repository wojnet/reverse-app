import { FC } from 'react';

interface BlockOptionListProps {
  children: React.ReactNode;
}

const BlockOptionList: FC<BlockOptionListProps> = ({ children }) => {
  return (
    <div className="flex absolute gap-2 right-[10px] top-[-10px]">
      {children}
    </div>
  );
}

export default BlockOptionList;