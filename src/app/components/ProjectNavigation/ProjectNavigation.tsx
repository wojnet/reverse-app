"use client"
import { 
  FC,
  useRef,
} from 'react';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { cn } from '@/app/utils/cn';
import Resizer from './Resizer';
import List from './List';

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
      className="w-[200px] h-full flex items-stretch justify-between shadow-xl relative"
      ref={navigationRef}
    >
      <div className="w-full flex-1 h-full p-4">
        <h1 className="text-xl mb-5">SONGS 🎵</h1>
        <List />
      </div>
      <Resizer
        widthSetter={setNavigationWidth}
        navigationRef={navigationRef}
      />
    </div>
  );
}

export default ProjectNavigation;