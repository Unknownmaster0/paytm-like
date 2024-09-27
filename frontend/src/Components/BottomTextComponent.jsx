import { Link } from "react-router-dom";

export const BottomTexts = function ({ text, buttonText, to }) {
  return (
    <div style={{ marginLeft: "10px" }}>
      <span className="text-lg font-normal text-slate-900 dark:text-white">
        {text}
      </span>
      <Link
        to={to}
        className="cursor-pointer pl-1 text-blue-500 dark:text-blue-400"
      >
        {buttonText}
      </Link>
    </div>
  );
};
