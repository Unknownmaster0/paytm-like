export const Balance = function ({ balance }) {
  return (
    <div className="flex justify-between sm:w-60 w-48">
      <div className="font-bold sm:text-lg text-sm">Your balance is</div>
      {balance && <div className="sm:text-lg text-sm"> {balance}</div>}
    </div>
  );
};
