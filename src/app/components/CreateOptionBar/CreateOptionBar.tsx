"use client"
import { FC, useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '@/hooks/redux';
import {
  changeEditMode,
  selectEditMode,
} from '../../features/options/optionsSlice';
import ToggleSwitch from '../ToggleSwitch';
import EditableInput from '../EditableInput';
import { changeProjectName } from '@/app/features/projects/projectsSlice';
import { useSearchParams } from 'next/navigation';

type CreateOptionBarProps = {
  setUrlParam: (key: string, value: string) => void,
  initialProjectName: string,
};

const CreateOptionBar: FC<CreateOptionBarProps> = ({ setUrlParam, initialProjectName }) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id") || "";
  const [projectName, setProjectName] = useState<string>(initialProjectName);

  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);

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
        className="w-full h-10 bg-app-light-gray flex justify-between items-center gap-2 px-4 shadow-lg"
    >
      <section className="flex items-center gap-2">
        <p className="text-sm">
          EDIT MODE:
        </p>
        <ToggleSwitch
          id="1"
          state={editMode}
          handleOnChange={handleOnChangeToggle}
        />
      </section>
      <EditableInput
        className="w-fit text-right"
        type="text"
        value={projectName}
        onChange={handleOnChangeName}
        onAccept={acceprProjectName}
        spellCheck="false"
      />
    </div>
  );
}

export default CreateOptionBar;