"use client"
import { 
  FC,
  useRef,
} from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Resizer from './Resizer';
import List from './List';
import Image from 'next/image';
import UserOptions from '../UserOptions/UserOptions';

interface ProjectNavigationProps {
  minWidth?: number;
  maxWidth?: number;
}

const ProjectNavigation: FC<ProjectNavigationProps> = ({
  minWidth = 150,
  maxWidth = 400
}) => {
  const navigationRef = useRef<HTMLDivElement>(null);
  const storage = useLocalStorage();

  const setNavigationWidth = (width: number) => {
    if (
      navigationRef.current !== null &&
      width >= minWidth &&
      width <= maxWidth
    ) {
        navigationRef.current.style.width = `${width}px`;
        storage.setItem("editorNavigationWidth", width);
      }
  }

  return (
    <div
      className="w-[200px] h-full max-h-screen bg-gray-100 overflow-hidden flex items-stretch justify-between shadow-xl relative"
      ref={navigationRef}
    >
      <div className="w-full h-full max-h-screen flex-1 flex flex-col p-4">
        <h1 className="text-xl mb-5">SONGS 🎵</h1>
        <List />
        <UserOptions />
      </div>
      <Resizer
        widthSetter={setNavigationWidth}
        navigationRef={navigationRef}
      />
    </div>
  );
}

export default ProjectNavigation;