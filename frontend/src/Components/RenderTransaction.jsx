import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../url";

export function RenderTransaction() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(transaction);

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
      {loading && <Spinner />}
      {transaction.length > 0 ? (
        transaction.map((transaction) => (
          <Render
            key={transaction.id}
            amount={
              transaction.amount > 0
                ? transaction.amount
                : -1 * transaction.amount
            }
            userDetail={transaction.user.firstName + transaction.user.lastName}
            type={transaction.amount > 0 ? "Received" : "Send"}
            date={transaction.createdAt}
          />
        ))
      ) : (
        <NoTransactionCard />
      )}
    </div>
  );
}

const Render = ({ amount, userDetail, type, date }) => {
  return (
    <div className="sm:p-8">
      <div className="flex justify-evenly text-xl text-slate-900 font-bold border border-red-900 ">
        <div className="border-r-2  border-red-900 flex items-center justify-center">
          <p>{type}</p>
        </div>
        <div className="border-r-2  border-red-900">
          <p>{userDetail}</p>
        </div>
        <div className="border-r-2 border-red-900">
          <p>{date}</p>
        </div>
        <div>
          <p>{amount}</p>
        </div>
      </div>
    </div>
  );
};

const NoTransactionCard = () => {
  return (
    <div className="text-4xl text-slate-500 font-extrabold">
      You have no transaction to show
    </div>
  );
};
