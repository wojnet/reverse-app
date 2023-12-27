"use client"
import { FC, useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '@/hooks/redux';
import {
  changeEditMode,
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
    dispatch(toggleIsAccentPaletteVisible());
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
          { isSaved ?
            mobileMode ? "✅" : "✅ SAVED" :
            mobileMode ? "💾" : "💾 SAVE"
          }
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
        />
      </section>
      <div className="select-none relative">
        <button onClick={() => dispatch(toggleIsAccentPaletteVisible())}>
          🎨
        </button>
        { isAccentPaletteVisible && <div
          className="absolute w-24 flex flex-col items-center gap-2 bg-app-lighter-gray p-2 rounded-lg shadow-xl top-0 left-7"
          ref={accentPaletteRef}
        >
          <p className="text-sm">not yet</p>
          <p className="text-sm">{"(„• ֊ •„)"}</p>
          <input type="color" />
        </div> }
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