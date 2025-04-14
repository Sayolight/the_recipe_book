export const Button = (props: {
  text: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={props.type ?? "button"}
      className={
        "rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 hover:cursor-pointer " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
