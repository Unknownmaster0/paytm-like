export const ButtonComponent = function ({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-800 text-white font-bold py-2 sm:px-6 border rounded hover:bg-gray-700"
    >
      {label}
    </button>
  );
};
