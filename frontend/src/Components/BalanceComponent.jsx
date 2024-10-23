export const Balance = function ({ balance }) {
  return (
    <div className="flex justify-between w-60">
      <div className="font-bold text-lg">Your balance is</div>
      {balance && <div className="text-lg"> {balance}</div>}
    </div>
  );
};
