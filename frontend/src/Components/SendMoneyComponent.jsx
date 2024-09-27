export const SendMoney = function () {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Send Money
        </h2>

        <div className="flex items-center justify-start mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full text-lg font-bold">
            A
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Friend's Name
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            Amount (in Rs)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300">
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
