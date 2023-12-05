"use client"
import { FC, useEffect } from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import {
  useAppDispatch, useAppSelector,
  // useAppSelector
} from '@/hooks/redux';
// import { selectEditMode } from '../features/options/optionsSlice';
import {
  TitleBlock,
  TextBlock,
  CommentBlock
} from './SongBlocks/SongBlocks';
import CreateOptionBar from './CreateOptionBar/CreateOptionBar';
import ProjectNavigation from './ProjectNavigation/ProjectNavigation';
import type { SongType } from '../../types/song';
import type { ProjectType } from '../../types/project';
import { fetchProjectsData, selectError, selectIsLoading, selectProjectsData } from '../features/projects/projectsSlice';
import { selectEditMode } from '../features/options/optionsSlice';

type WorkspaceProps = {
  songData: SongType | undefined,
  // projectsData: ProjectType[],
}

const Workspace: FC<WorkspaceProps> = ({
  songData,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editMode: boolean = useAppSelector(selectEditMode);

  const projectsIsLoading = useAppSelector(selectIsLoading);

  const setUrlParam = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  const songContents = songData?.contents.map((element, index) => {
    switch (element.type) {
      case "TITLE_BLOCK":
        return (
          <TitleBlock
            key={index}
            title={element.data.title}
            subtitle={element.data.subtitle}
            editMode={editMode}
          />
        );
      case "TEXT_BLOCK":
        return <TextBlock 
          key={index}
          paragraphs={element.data.paragraphs}
          editMode={editMode}
        />;
      case "COMMENT_BLOCK":
        return <CommentBlock
          key={index}
          text={element.data.text}
          editMode={editMode}
        />;
      default:
        return null;
    }
  });

  useEffect(() => {
    // console.log("Workspace mounted");
  }, []);

  return (
    <>
      <ProjectNavigation
        setUrlParam={setUrlParam}
      />

      { songData && <div className="w-full h-full1 flex-1 flex flex-col">
          <CreateOptionBar 
            initialProjectName={songData.name}
            setUrlParam={setUrlParam}
          />
          <div className="w-full h-full flex-1 flex flex-col items-center gap-5 p-5">
            <h1>{ projectsIsLoading ? "LOADING" : "" }</h1>
            { songContents }
          </div>
        </div> }

      { !songData && <div className="w-full h-full1 flex-1 flex flex-col items-center">
          <h2 className="text-2xl m-10">
            Choose or create a project
          </h2>
        </div> }
    </>
  );
}

export default Workspace;