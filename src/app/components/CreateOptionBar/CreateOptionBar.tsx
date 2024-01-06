"use client"
import { FC, useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '@/hooks/redux';
import {
  changeEditMode,
  changeIsAccentPaletteVisible,
  changeIsMobileNavbarVisible,
  selectDevMode,
  selectEditMode,
  selectIsAccentPaletteVisible,
  selectMobileMode,
  toggleIsAccentPaletteVisible,
} from '../../features/options/optionsSlice';
import ToggleSwitch from '../ToggleSwitch';
import EditableInput from '../EditableInput';
import { changeProjectName } from '@/app/features/projects/projectsSlice';
import { useSearchParams } from 'next/navigation';
import { saveChanges, selectIsSaveLoading, selectIsSaved } from '@/app/features/song/songSlice';
import { useClickAway } from '@uidotdev/usehooks';
import ColorPalette from './ColorPalette';

type CreateOptionBarProps = {
  setUrlParam: (key: string, value: string) => void,
  initialProjectName: string,
};

const CreateOptionBar: FC<CreateOptionBarProps> = ({
  setUrlParam,
  initialProjectName,
}) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id") || "";
  const [projectName, setProjectName] = useState<string>(initialProjectName);

  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);
  const devMode = useAppSelector(selectDevMode);
  const isSaved = useAppSelector(selectIsSaved);
  const isSaveLoading = useAppSelector(selectIsSaveLoading);
  const mobileMode = useAppSelector(selectMobileMode);
  const isAccentPaletteVisible = useAppSelector(selectIsAccentPaletteVisible);

  const accentPaletteRef = useClickAway<HTMLDivElement>(() => {
    dispatch(changeIsAccentPaletteVisible(false));
  });

  const handleOnChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(changeEditMode(true));
    } else {
      dispatch(changeEditMode(false));
    }
  }

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  }

  const acceprProjectName = () => {
    dispatch(changeProjectName({ id: idParam, name: projectName }));
  }
  
  useEffect(() => {
    setProjectName(initialProjectName);
  }, [initialProjectName]);

  // MOBILE MODE
  if (mobileMode) return (
    <div className="w-full flex items-center bg-app-light-gray shadow-lg sticky top-0 z-30">
      <button
        className="text-3xl font-bold p-2"
        onClick={() => dispatch(changeIsMobileNavbarVisible(true))}
      >
        ☰
      </button>
      <div className="w-full flex flex-col items-end p-2">
        <div
            className="w-full flex-shrink-0 flex justify-between items-center gap-2"
        >
          <section className="h-6 flex items-center gap-2 flex-shrink-0">
            <p className="text-xs sm:text-sm">
              EDIT MODE
            </p>
            <ToggleSwitch
              id="1"
              state={editMode}
              handleOnChange={handleOnChangeToggle}
              size="small"
            />
          </section>
          <EditableInput
            className="text-right w-28"
            type="text"
            value={projectName}
            onChange={handleOnChangeName}
            onAccept={acceprProjectName}
            spellCheck="false"
            placeholder="project name"
          />
        </div>
        <div
            className="w-full flex-shrink-0 flex justify-start items-center gap-2"
        >
          <button
            className="text-xs sm:text-sm border border-1 border-app-text p-[2px_7px] rounded-full hover:scale-95 disabled:opacity-25 disabled:hover:scale-100 transition"
            onClick={() => dispatch(saveChanges())}
            disabled={isSaved}
          >
            { isSaved ? "✅" : "💾" }
            { isSaveLoading && <span>
              saving
            </span> }
          </button>
          <section ref={accentPaletteRef}>
            <div className="select-none relative">
              <button
                className="text-xs sm:text-sm border border-1 border-app-text p-[2px_7px] rounded-full hover:scale-95 disabled:opacity-25 disabled:hover:scale-100 transition"
                onClick={() => dispatch(toggleIsAccentPaletteVisible())}
              >
                🎨
              </button>
              { isAccentPaletteVisible && <ColorPalette
              
              /> }
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // DESKTOP MODE
  return (
    <div
        className="w-full h-12 flex-shrink-0 bg-app-light-gray flex justify-between items-center gap-2 px-4 shadow-lg sticky top-0 z-30"
    >
      <section className="flex items-center gap-3">
        <button
          className="text-xs sm:text-sm border border-1 border-app-text p-[2px_7px] rounded-full hover:scale-95 disabled:opacity-25 disabled:hover:scale-100 transition"
          onClick={() => dispatch(saveChanges())}
          disabled={isSaved}
        >
          { isSaved ? "✅ SAVED" : "💾 SAVE" }
          { isSaveLoading && <span>
            ...
          </span> }
        </button>
        <p className="text-xs sm:text-sm">
          EDIT:
        </p>
        <ToggleSwitch
          id="1"
          state={editMode}
          handleOnChange={handleOnChangeToggle}
          size="normal"
        />
      </section>
      <div className="select-none relative">
        <section ref={accentPaletteRef}>
          <button
            onClick={() => dispatch(toggleIsAccentPaletteVisible())}
          >
            🎨
          </button>
          { isAccentPaletteVisible && <ColorPalette
          
          /> }
        </section>
      </div>
      <EditableInput
        className="w-fit text-right"
        type="text"
        value={projectName}
        onChange={handleOnChangeName}
        onAccept={acceprProjectName}
        spellCheck="false"
        placeholder="project name"
      />
    </div>
  );
}

export default CreateOptionBar;