import { useNavigate } from "react-router-dom";

interface ButtonProps {
  btnText: string;
  onClick?: () => void;
  to?: string;
}

export default function Button({ btnText, onClick, to }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  return (
    <button
      className="rounded-xl cursor-pointer p-2 shadow bg-yellow-300 hover:bg-yellow-400 text-center w-40 md:w-80 xl:w-160 text-md md:text-xl xl:text-2xl"
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
}
