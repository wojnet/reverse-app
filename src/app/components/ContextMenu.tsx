"use client";
import { FC } from 'react';
import { useClickAway } from "@uidotdev/usehooks";

export type ContextMenuOptionsType = { name: string, callback: () => void }[];

type ContextMenuProps = {
  options?: ContextMenuOptionsType,
  x: number,
  y: number,
  closeContextMenu: () => void,
}

const ContextMenu: FC<ContextMenuProps> = ({ options, x, y, closeContextMenu }) => {
  const contextMenuRef = useClickAway<HTMLUListElement>(() => closeContextMenu());

  const optionElements = options?.map((option, index) => {
    return (
      <li
        key={index}
      >
        <button
          className="w-full text-left text-sm bg-app-lighter-gray rounded-lg shadow-md p-[2px_6px] whitespace-nowrap hover:opacity-70 transition"
          onClick={option.callback}
        >
          {option.name}
        </button>
      </li>
    );
  });

  return (
    <ul
      style={{ top: `${y}px`, left: `${x}px` }}
      className="bg-app-light-gray font-mono flex flex-col gap-[6px] outline outline-2 outline-app-outline fixed rounded-xl shadow-xl p-[6px] z-50 animate-bounce"
      ref={contextMenuRef}
    >
      { optionElements }
    </ul>
  );
}

export default ContextMenu;