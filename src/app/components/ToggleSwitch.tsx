import { FC } from "react";

type ToggleSwitchProps = {
  id: string,
  state: boolean,
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  size: "small" | "normal",
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ id, state, handleOnChange, size }) => {
  if (size === "small") return (
    <>
      <input
        className="h-0 w-0 hidden [&:checked+label_span]:left-[calc(100%-14px)] [&:checked+label]:bg-green-500"
        checked={state}
        onChange={handleOnChange}
        type="checkbox"
        id={`toggle-switch-${id}`} />
      <label
        className="flex justify-between items-center cursor-pointer w-8 h-4 bg-gray-400 rounded-full relative transition" 
        htmlFor={`toggle-switch-${id}`}
      >
        <span className="absolute top-[2px] left-[2px] w-3 h-3 rounded-full bg-white shadow-md transition [transition:_left_200ms_ease]"></span>
      </label>
    </>
  );

  if (size === "normal") return (
    <>
      <input
        className="h-0 w-0 hidden [&:checked+label_span]:left-[calc(100%-18px)] [&:checked+label]:bg-green-500"
        checked={state}
        onChange={handleOnChange}
        type="checkbox"
        id={`toggle-switch-${id}`} />
      <label
        className="flex justify-between items-center cursor-pointer w-10 h-5 bg-gray-400 rounded-full relative transition" 
        htmlFor={`toggle-switch-${id}`}
      >
        <span className="absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-white shadow-md transition [transition:_left_200ms_ease]"></span>
      </label>
    </>
  );

  return null;
}

export default ToggleSwitch;