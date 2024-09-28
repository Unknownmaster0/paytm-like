export const InputComponent = function ({ label, placeholder, onChange }) {
  return (
    <div className="my-2">
      <div className="font-medium text-black dark:text-gray-400 text-lg my-1">
        {label}
      </div>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="py-2 px-4 border-2 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
  );
};
