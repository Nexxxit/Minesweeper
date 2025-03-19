interface ButtonProps {
  btnText: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ btnText, onClick, className }: ButtonProps) {
  return (
    <button
      className={`${className} rounded-xl hover:outline-2 outline-offset-2 cursor-pointer p-2 shadow bg-yellow-300 hover:bg-yellow-400 text-center w-40 md:w-80 xl:w-160 text-md md:text-xl xl:text-2xl`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}
