import { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/Button";
import SettingMode from "../settingMode/SettingMode";
import { Link } from "react-router-dom";

export default function Settings() {
    const [selectedOption, setSelectedOption] = useState<string>(() => {
        return localStorage.getItem('selectedOption') || 'easy';
    });

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.id);
    }

    useEffect(() => {
        localStorage.setItem('selectedOption', selectedOption);
    }, [selectedOption])

  return (
    <div className="flex flex-col gap-10 w-full md:w-150 lg:w-160">
      <div className="flex flex-col gap-5">
        <SettingMode 
          labelText="Просто 8х8, 10 мин."  
          id="easy" 
          check={selectedOption === 'easy'}
          handleOptionChange={handleOptionChange} 
        />
        <SettingMode
          labelText="Средний 16х16, 40 мин."
          id="medium"
          check={selectedOption === 'medium'}
          handleOptionChange={handleOptionChange}
        />
        <SettingMode
          labelText="Сложный 32х16, 100 мин."
          id="hard"
          check={selectedOption === 'hard'}
          handleOptionChange={handleOptionChange}
        />
      </div>
      <Link to={"/"}>
        <Button
          className="w-full text-xl"
          btnText="Назад"
        />
      </Link>
    </div>
  );
}
