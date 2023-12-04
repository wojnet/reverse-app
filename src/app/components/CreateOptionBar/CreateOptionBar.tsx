"use client"
import { FC } from 'react';
import {
  useAppDispatch,
  useAppSelector
} from '@/hooks/redux';
import {
  changeEditMode,
  selectEditMode,
} from '../../features/options/optionsSlice';
import ToggleSwitch from '../ToggleSwitch';

type CreateOptionBarProps = {
  setUrlParam: (key: string, value: string) => void;
};

const CreateOptionBar: FC<CreateOptionBarProps> = ({ setUrlParam }) => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(changeEditMode(true));

    } else {
      dispatch(changeEditMode(false));
    }
  }

  return (
    <div
        className="w-full h-10 bg-app-light-gray flex items-center gap-2 p-2 shadow-lg"
    >
      <p className="text-sm">
        EDIT MODE:
      </p>
      <ToggleSwitch
        id="1"
        state={editMode}
        handleOnChange={handleOnChange}
      />
    </div>
  );
}

export default CreateOptionBar;