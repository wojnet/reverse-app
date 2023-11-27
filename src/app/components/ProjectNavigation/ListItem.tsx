import Link from 'next/link';
import { FC } from 'react';

interface ListItemProps {
  id: string;
  name?: string;
  savedChanges?: boolean;
}

const ListItem: FC<ListItemProps> = ({
  id = "",
  name = "(no name)",
  savedChanges = true,
}) => {
  return (
    <Link
      href={`/create/${id}`}
      className="w-full h-10 flex justify-between items-center shadow-md rounded-xl px-2 cursor-pointer outline-transparent hover:outline hover:outline-1 hover:outline-slate-300 hover:bg-slate-50 select-none transition"
    >
      <p className="italic text-sm">{name}</p>
      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
    </Link>
  );
}

export default ListItem;