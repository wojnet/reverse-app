"use client"
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import ListItemOptions from './ListItemOptions';
import ContextMenu, { ContextMenuOptionsType } from '../ContextMenu';

type ListItemProps = {
  id: string,
  name?: string,
  setUrlParam: (key: string, value: string) => void,
}

type ContextMenuType = {
  show: boolean,
  x: number,
  y: number,
};

const initialContextMenu: ContextMenuType = {
  show: false,
  x: 0,
  y: 0,
};

const ListItem: FC<ListItemProps> = ({
  id = "",
  name = "(no name)",
  setUrlParam,
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuType>(initialContextMenu);

  const searchParams = useSearchParams();
  const searchParamsId = searchParams.get("id");
  const idSearchParam = searchParams.get("id"); 

  const onSelectProject = () => {
    if (idSearchParam !== id) {
      setUrlParam("id", id);
    }
  }

  const handleOnContextMenu = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    const { pageX, pageY } = event;

    setContextMenu({
      show: true,
      x: pageX,
      y: pageY
    });
  }

  const closeContextMenu = () => {
    setContextMenu(initialContextMenu);
  }

  const contextMenuOptions: ContextMenuOptionsType = [{
    name: "DELETE",
    callback: () => {},
  }, {
    name: "SORRY",
    callback: () => alert("Sorry for iritating bouncy animation, it's just for fun"),
  }];

  useEffect(() => {
    // console.log("ListItem mounted");
  }, []);

  return (
    <div className="flex flex-1 gap-[6px]">
      { contextMenu.show && <ContextMenu
        options={contextMenuOptions}
        x={contextMenu.x}
        y={contextMenu.y}
        closeContextMenu={closeContextMenu}
      /> }
      <button
        onClick={onSelectProject}
        onContextMenu={handleOnContextMenu}
        className="relative w-full h-10 bg-app-gray flex justify-between items-center shadow-md rounded-xl px-3 cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-app-lighter-outline hover:scale-95 select-none z-10 group transition"
      >
        <p
          className="italic text-sm whitespace-nowrap overflow-hidden px-1"
        >
          {name}
        </p>
        { searchParamsId === id && <div className="absolute left-0 w-full h-full rounded-xl outline outline-2 outline-app-outline outline-offset-0 group-hover:outline-transparent"></div>}
      </button>
      <ListItemOptions />
    </div>
  );
}

export default ListItem;