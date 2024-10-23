import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../url";

export const SendMoney = function () {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const [money, setMoney] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // check if the user is valid or not, if not valid user, then send them to signin page.
    // check if the user has token in its local storage or not, if not then return that not valid user.
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/validate`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.data.success) {
          navigate("/signin");
        }
      } catch (err) {
        console.error(`Error while validation of the user ${err}`);
        navigate("/signin");
      }
    })();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-black mb-4">
          Send Money
        </h2>

        <div className="flex items-center justify-start mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full text-lg font-bold">
            {name[0]}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
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
            onChange={(e) => setMoney(e.target.value)}
            type="number"
            id="amount"
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
          onClick={async () => {
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/account/transfer`,
                {
                  to: id,
                  amount: money,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate("/dashboard");
            } catch (error) {
              alert(`Insufficient balance to transfer`);
            }
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};
