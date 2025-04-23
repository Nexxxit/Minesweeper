import { memo } from "react";

interface ButtonProps {
  btnText: string;
  onClick?: () => void;
  className?: string;
}

export default memo(function Button({ btnText, onClick, className }: ButtonProps) {
  return (
    <button
      className={`${className} transition duration-150 ease-in-out lg:hover:-translate-y-1 lg:hover:scale-105 rounded-xl hover:outline-2 outline-offset-2 cursor-pointer p-2 shadow bg-yellow-300 hover:bg-yellow-400 text-center text-md md:text-xl xl:text-2xl`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
})
