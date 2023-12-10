"use client"
import { FC, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import ListItemOptions from './ListItemOptions';

type ListItemProps = {
  id: string,
  name?: string,
  setUrlParam: (key: string, value: string) => void,
}

const ListItem: FC<ListItemProps> = ({
  id = "",
  name = "(no name)",
  setUrlParam,
}) => {
  const searchParams = useSearchParams();
  const searchParamsId = searchParams.get("id");
  const idSearchParam = searchParams.get("id"); 

  const onSelectProject = () => {
    if (idSearchParam !== id) {
      setUrlParam("id", id);
    }
  }

  useEffect(() => {
    // console.log("ListItem mounted");
  }, []);

  return (
    <div className="flex gap-2">
      <button
        onClick={onSelectProject}
        className="relative w-full h-10 bg-app-gray flex justify-between items-center shadow-md rounded-xl px-3 cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-app-lighter-outline hover:scale-95 select-none z-10 group transition"
      >
        <p className="italic text-sm">{name}</p>
        { searchParamsId === id && <div className="absolute left-0 w-full h-full rounded-xl outline outline-2 outline-app-outline outline-offset-0 group-hover:outline-transparent"></div>}
      </button>
      <ListItemOptions />
    </div>
  );
}

export default ListItem;