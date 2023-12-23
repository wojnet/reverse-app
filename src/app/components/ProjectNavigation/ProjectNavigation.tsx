"use client"
import { 
  FC,
  useRef,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Resizer from './Resizer';
import List from './List';
import UserOptions from '../UserOptions/UserOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeIsMobileNavbarVisible, selectIsMobileNavbarVisible } from '@/app/features/options/optionsSlice';
import { addNewProject } from '@/app/features/projects/projectsSlice';

type ProjectNavigationProps = {
  setUrlParam: (key: string, value: string) => void,
  mobileMode: boolean,
  minWidth?: number,
  maxWidth?: number,
}

const ProjectNavigation: FC<ProjectNavigationProps> = ({
  setUrlParam,
  mobileMode,
  minWidth = 150,
  maxWidth = 500
}) => {
  const navigationRef = useRef<HTMLDivElement>(null);
  const storage = useLocalStorage();
  const dispatch = useAppDispatch();

  const isMobileNavbarVisible = useAppSelector(selectIsMobileNavbarVisible);

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

  const handleAddNewProject = async () => {
    await dispatch(addNewProject({ name: "" }));
  }
   
  if (mobileMode) return (
    <>
      <div
        style={ isMobileNavbarVisible ? { left: "0", boxShadow: "0 0 100px #000A" } : { left: "-100%", boxShadow: "none" }}
        className="w-full h-full bg-app-light-gray flex flex-col items-center justify-center gap-5 absolute z-[60] [transition:_left_500ms_ease,_box-shadow_500ms_ease] p-[40px_60px]"
      >
        <button
          className="absolute top-3 right-3 text-3xl font-bold"
          onClick={() => dispatch(changeIsMobileNavbarVisible(false))}
        >
          ✕
        </button>
        <h1 className="text-3xl select-none">PROJECTS</h1>
        <List
          setUrlParam={setUrlParam}
        />
        <button 
          className="w-2/3 sm:w-full h-8 sm:h-9 bg-app-lighter-gray flex justify-center items-center text-xs rounded-full shadow-md cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-slate-100 hover:scale-95 select-none transition p-[2px_8px]"
          onClick={handleAddNewProject}
        >
          NEW PROJECT
        </button>
        <section className="flex-1"></section>
        <UserOptions />
      </div>
    </>
  );

  return (
    <div
      className="w-[250px] h-full max-h-screen bg-app-light-gray overflow-hidden flex items-stretch justify-between shadow-2xl relative"
      ref={navigationRef}
    >
      <div className="w-full h-full max-h-screen flex-1 flex flex-col justify-between gap-5 p-4">
        <h1 className="text-2xl sm:text-[28px] m-1 select-none">PROJECTS</h1>
        <List
          setUrlParam={setUrlParam}
        />
        <button 
          className="w-2/3 sm:w-full h-8 sm:h-9 bg-app-lighter-gray flex justify-center items-center text-xs sm:text-sm rounded-full shadow-md cursor-pointer outline-transparent hover:outline hover:outline-2 hover:outline-slate-100 hover:scale-95 select-none transition p-[2px_8px]"
          onClick={handleAddNewProject}
        >
          NEW PROJECT
        </button>
        <section className="flex-1"></section>
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