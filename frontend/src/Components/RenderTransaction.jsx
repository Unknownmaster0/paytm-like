import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../url";
import { AppBar } from "./AppBarComponent";

export function RenderTransaction() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userName } = useParams();

  useEffect(() => {
    // check valid token.
    const token = localStorage.getItem("token");
    // if token is invalid then throw exception
    if (!token) {
      navigate("/");
      return;
    }

    // otherwise setTransaction.
    (async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/account/getMovements`,
          {
            headers: { Authorization: token },
          }
        );

        const response = res.data;
        if (!response.success) {
          alert("Error has occurred");
          return;
        }
        setLoading(false);
        setTransaction(response.data);
      } catch (error) {
        alert(error.message);
        return;
      }
    })();
  }, []);

  return (
    <div>
      <AppBar username={userName} logout={true}/>
      {loading && <Spinner />}
      <div className="container px-4 mx-auto sm:px-8 max-w-screen">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 sm:text-2xl sm:font-bold"
                    >
                      Transaction type
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 sm:text-2xl sm:font-bold"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 sm:text-2xl sm:font-bold"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 sm:text-2xl sm:font-bold"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.length > 0 ? (
                    transaction.map((transaction) => (
                      <Render
                        key={transaction.id}
                        amount={
                          transaction.amount > 0
                            ? transaction.amount
                            : -1 * transaction.amount
                        }
                        userDetail={
                          transaction.user.firstName +
                          " " +
                          transaction.user.lastName
                        }
                        type={transaction.amount > 0 ? "Received" : "Send"}
                        date={transaction.createdAt}
                      />
                    ))
                  ) : (
                    <NoTransactionCard />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Render = ({ amount, userDetail, type, date }) => {
  return (
    <tr>
      <td className="sm:px-5 px-2 sm:py-5 py-2 text-sm bg-white border-b border-gray-200 sm:text-lg sm:font-semibold relative sm:left-10 left-5">
        <span className="text-gray-900 whitespace-no-wrap">{type}</span>
      </td>
      <td className="sm:px-5 px-2 sm:py-5 py-2 text-sm bg-white border-b border-gray-200 relative sm:-left-5 -left-2">
        <p className="text-gray-900 whitespace-no-wrap sm:text-lg sm:font-semibold">
          {userDetail}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap sm:text-lg sm:font-semibold">
          {date}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 sm:text-lg sm:font-semibold">
          {amount}
        </span>
      </td>
    </tr>
  );
};

const NoTransactionCard = () => {
  return (
    <tr>
      <td>
        <p className="text-4xl font-extrabold">
          You have no transaction to show
        </p>
      </td>
    </tr>
  );
};
