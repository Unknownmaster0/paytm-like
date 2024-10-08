export const ButtonComponent = function ({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white font-bold py-2 px-10 border rounded hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300"
    >
      {label}
    </button>
  );
};
