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
import { useHotkeys } from "react-hotkeys-hook";
import {
  TitleBlock,
  TextBlock,
  CommentBlock
} from './SongBlocks/SongBlocks';
import CreateOptionBar from './CreateOptionBar/CreateOptionBar';
import ProjectNavigation from './ProjectNavigation/ProjectNavigation';
import type { SongType } from '../../types/song';
import {
  fetchSongData,
  saveChanges,
  selectIsLoaded,
  selectIsLoading,
  selectIsSaved
} from '../features/song/songSlice';
import { 
  changeIsMobileNavbarVisible,
  changeMobileMode,
  selectEditMode,
  selectMobileMode,
  toggleEditMode
} from '../features/options/optionsSlice';
import AddBlock from './SongBlocks/AddBlock';
import { selectSongData } from '../features/song/songSlice';
import { throttle } from 'lodash';
import { defaultColors } from '@/data/defaultColors';

const Workspace: FC = () => {
  const dispatch = useAppDispatch();

  const songData: SongType = useAppSelector(selectSongData);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const editMode: boolean = useAppSelector(selectEditMode);
  const mobileMode: boolean = useAppSelector(selectMobileMode);
  const isLoaded: boolean = useAppSelector(selectIsLoaded);
  const isSaved = useAppSelector(selectIsSaved);
  const isLoading = useAppSelector(selectIsLoading);

  const idParam = searchParams.get("id") || "";

  const setUrlParam = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, value);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  // const backgroundColor = songData.colors?.background || defaultColors.background;
  // const textColor = songData.colors?.text || defaultColors.text;
  // const chordColor = songData.colors?.chord || defaultColors.chord;

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

  useHotkeys("ctrl+s", (event) => {
    event.preventDefault();
    if (!isSaved) {
      dispatch(saveChanges());
    }
  });

  useHotkeys("ctrl+e", (event) => {
    event.preventDefault();
    dispatch(toggleEditMode());
  });

  const handleResize = (event: UIEvent) => {
    if (window.innerWidth >= 600) {
      dispatch(changeMobileMode(false));
      dispatch(changeIsMobileNavbarVisible(false));
    } else if (window.innerWidth < 600) {
      dispatch(changeMobileMode(true));
    }
  }

  const throttledHandleResize = throttle(handleResize, 100);

  useEffect(() => {
    if (idParam) {
      dispatch(fetchSongData({ id: idParam }));
    }
  }, [idParam]);

  useEffect(() => {
    if (!isLoaded) {
      setUrlParam("id", "");
    }
  }, [isLoaded]);

  useEffect(() => {
    dispatch(changeMobileMode(window.innerWidth >= 600 ? false : true));

    window.addEventListener("resize", throttledHandleResize);

    return () => {
      removeEventListener("resize", throttledHandleResize);
    }
  }, []);

  return (
    <>
      <ProjectNavigation
        setUrlParam={setUrlParam}
        mobileMode={mobileMode}
      />

      { isLoaded && <div
        className="w-full h-full flex-1 flex flex-col items-center overflow-x-hidden overflow-y-auto"
      >
        <CreateOptionBar 
          initialProjectName={songData?.name || ""}
          setUrlParam={setUrlParam}
        />
        <div
          style={{
            opacity: isLoading ? "0.5" : "1",
            gap: editMode ? "30px" : "0",
            width: mobileMode ? "100%" : "80%",
            marginBlock: mobileMode ? "0" : "40px",
            borderRadius: mobileMode ? "0" : "12px",
          }}
          className="w-4/5 max-w-[800px] h-auto bg-sheet-background text-sheet-text flex-1 flex flex-col items-center gap-5 p-8 my-10 pb-24 shadow-xl shadow-sheet-shadow rounded-xl transition"
        >
          { songContents }
          { editMode && <AddBlock dispatch={dispatch} /> }
        </div>
      </div> }

      { !isLoaded && <div className="w-full h-full1 flex-1 flex flex-col items-center">
        { mobileMode && <button
            className="text-3xl font-bold fixed top-3 left-3"
            onClick={() => dispatch(changeIsMobileNavbarVisible(true))}
          >
            ☰
          </button> }
        <h2 className="text-2xl text-center m-10 animate-pulse">
          Select or create a project
        </h2>
      </div> }
    </>
  );
}

export default Workspace;