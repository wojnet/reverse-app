"use client"
import { FC, MouseEvent, useState } from 'react';
import { useSearchParams } from "next/navigation";
import ContextMenu, { ContextMenuOptionsType } from '../ContextMenu';
import { useAppDispatch } from '@/hooks/redux';
import { changeIsMobileNavbarVisible } from '@/app/features/options/optionsSlice';
import { deleteProject } from '@/app/features/projects/projectsSlice';
import { clearSongData } from '@/app/features/song/songSlice';

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
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const searchParamsId = searchParams.get("id");
  const idSearchParam = searchParams.get("id"); 

  const onSelectProject = () => {
    dispatch(changeIsMobileNavbarVisible(false));
    
    if (idSearchParam !== id) {
      setUrlParam("id", id);
    }
  }

  const handleCloseProject = () => {
    dispatch(clearSongData());
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
    callback: async () => {
      await dispatch(deleteProject({ id }));
      if (searchParamsId === id) window.location.replace("/create");
    },
  }];

  return (
    <div className="flex flex-1 gap-[6px]">
      { contextMenu.show && <ContextMenu
        options={contextMenuOptions}
        x={contextMenu.x}
        y={contextMenu.y}
        closeContextMenu={closeContextMenu}
      /> }
      { searchParamsId === id && <button
          className="absolute h-6 w-6 flex items-center justify-center bg-app-gray text-rose-500 rounded-lg outline outline-2 outline-app-outline outline-offset-0 z-20 translate-x-[-8px] translate-y-[-8px] hover:outline hover:outline-2 hover:outline-app-lighter-outline hover:scale-95 transition select-none"
          onClick={handleCloseProject}
        >&#10006;</button>
      }
      <button
        onClick={onSelectProject}
        onContextMenu={handleOnContextMenu}
        className="relative w-full h-10 sm:h-12 bg-app-gray flex justify-between items-center shadow-md rounded-xl px-3 cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-app-lighter-outline hover:scale-95 select-none z-10 group transition"
      >
        <p
          className="italic text-sm sm:text-[16px] whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {name}
        </p>
        { searchParamsId === id && <div className="absolute left-0 w-full h-full rounded-xl outline outline-2 outline-app-outline outline-offset-0 group-hover:outline-transparent"></div>}
      </button>
      
    </div>
  );
}

export default ListItem;