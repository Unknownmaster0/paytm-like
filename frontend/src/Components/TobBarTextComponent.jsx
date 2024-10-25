export const TopBarText = function ({ text, to }) {
  return (
    <div className="text-lg sm:text-2xl sm:font-bold text-slate-800">
      {text}
      {to}
    </div>
  );
};
