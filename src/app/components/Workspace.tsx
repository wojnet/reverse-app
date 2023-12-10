"use client"
import { FC, useEffect } from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import {
  useAppDispatch,
  useAppSelector,
} from '@/hooks/redux';
import {
  TitleBlock,
  TextBlock,
  CommentBlock
} from './SongBlocks/SongBlocks';
import CreateOptionBar from './CreateOptionBar/CreateOptionBar';
import ProjectNavigation from './ProjectNavigation/ProjectNavigation';
import type { SongType } from '../../types/song';
import { fetchSongData, selectIsLoading } from '../features/song/songSlice';
import { selectEditMode } from '../features/options/optionsSlice';
import AddBlock from './SongBlocks/AddBlock';
import { selectSongData } from '../features/song/songSlice';

type WorkspaceProps = {
  // songData: SongType | undefined,
}

const Workspace: FC<WorkspaceProps> = ({
  // songData,
}) => {
  const dispatch = useAppDispatch();

  const songData: SongType | null = useAppSelector(selectSongData);
  const songLoading = useAppSelector(selectIsLoading);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editMode: boolean = useAppSelector(selectEditMode);

  const idParam = searchParams.get("id") || "";

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
            index={index}
            title={element.data.title}
            subtitle={element.data.subtitle}
            editMode={editMode}
            dispatch={dispatch}
          />
        );
      case "TEXT_BLOCK":
        return <TextBlock 
          key={index}
          index={index}
          paragraphs={element.data.paragraphs}
          editMode={editMode}
          dispatch={dispatch}
        />;
      case "COMMENT_BLOCK":
        return <CommentBlock
          key={index}
          index={index}
          text={element.data.text}
          editMode={editMode}
          dispatch={dispatch}
        />;
      default:
        return null;
    }
  });

  useEffect(() => {
    // console.log("Workspace mounted");
    dispatch(fetchSongData({ id: idParam }));
  }, [idParam]);

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
          <div className="w-full h-full flex-1 flex flex-col items-center gap-5 p-5 mt-5">
            { songContents }
            { editMode && <AddBlock dispatch={dispatch} /> }
          </div>
        </div> }

      { (!songData) && <div className="w-full h-full1 flex-1 flex flex-col items-center">
          <h2 className="text-2xl m-10 animate-pulse">
            Choose or create a project
          </h2>
        </div> }
    </>
  );
}

export default Workspace;