"use client"
import { 
  FC,
  useEffect,
  useRef,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Resizer from './Resizer';
import List from './List';
import UserOptions from '../UserOptions/UserOptions';
import { ProjectType } from '@/types/project';

type ProjectNavigationProps = {
  setUrlParam: (key: string, value: string) => void,
  minWidth?: number,
  maxWidth?: number,
}

const ProjectNavigation: FC<ProjectNavigationProps> = ({
  setUrlParam,
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

  useEffect(() => {
    // console.log("ProjectNavigation mounted");
  }, []);

  return (
    <div
      className="w-[200px] h-full max-h-screen bg-app-light-gray overflow-hidden flex items-stretch justify-between shadow-2xl relative"
      ref={navigationRef}
    >
      <div className="w-full h-full max-h-screen flex-1 flex flex-col justify-between gap-5 p-4">
        <h1 className="text-xl select-none">PROJECTS</h1>
        <List
          setUrlParam={setUrlParam}
        />
        <button className="w-auto h-7 bg-app-lighter-gray flex justify-center items-center text-xs rounded-full shadow-md cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-slate-100 hover:scale-95 select-none transition p-[2px_8px]">
          NEW PROJECT
        </button>
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