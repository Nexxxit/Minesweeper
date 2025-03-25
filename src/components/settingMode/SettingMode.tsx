import { ChangeEvent } from "react";

interface SettingModeProps {
  labelText: string;
  check: boolean;
  id: string;
  handleOptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SettingMode({
  labelText,
  check,
  id,
  handleOptionChange,
}: SettingModeProps) {

  return (
    <div className="w-full flex gap-3">
      <label
        className="w-full text-xl flex items-center transition duration-150 ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105  flex gap-3 rounded-xl has-checked:outline-2 has-checked:outline-solid hover:outline-2 hover:outline-dashed outline-offset-2 cursor-pointer bg-blue-400 hover:bg-blue-500 p-5 has-checked:bg-blue-500 text-md md:text-xl xl:text-2xl"
        htmlFor={id}
      >
        <input
          className="box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white ring-1 ring-gray-950/20 outline-none checked:border-purple-500 checked:ring-purple-500"
          type="radio"
          name="settingMode"
          id={id}
          checked={check}
          onChange={handleOptionChange}
        />
        {labelText}
      </label>
    </div>
  );
}
