export const TopBarText = function ({ text, to }) {
  return (
    <div className="text-lg font-normal text-zinc-400 dark:text-zinc-300">
      {text}
      {to}
    </div>
  );
};
