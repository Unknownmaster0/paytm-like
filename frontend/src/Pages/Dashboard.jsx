import { useCallback, useEffect, useState } from "react";
import { AppBar } from "../Components/AppBarComponent";
import { Balance } from "../Components/BalanceComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../url";
import Spinner from "../Components/Spinner";
import { useUserhook } from "../CustomHooks/useUserhooks";

export const Dashboard = function () {
  const [inputVal, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const { userName, balance, authenciated, loading } = useUserhook();

  // Use useCallback for debounced search request
  const sendRequest = useCallback(async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/user/bulk?filter=${inputVal}`,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    setUsers(response.data.data);
  }, [inputVal]);

  // Debounce the sendRequest call
  useEffect(() => {
    const timer = setTimeout(() => {
      sendRequest();
    }, 500); // Debounce with a 500ms delay

    // Cleanup the timer when inputVal changes or component unmounts
    return () => clearTimeout(timer);
  }, [inputVal, sendRequest]);

  if (!authenciated) {
    return <Spinner />;
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {userName ? (
            <AppBar username={userName} logout={true} />
          ) : (
            <AppBar logout={true} />
          )}
          <div className="px-10 py-2">
            <div className="flex items-center justify-between">
              <Balance balance={balance} />
              {authenciated && (
                <div className="flex sm:space-x-4 space-x-1 justify-end">
                  <Link
                    to={`/render/${userName}`}
                    className="bg-blue-800 text-zinc-200 sm:text-sm sm:font-bold rounded-lg px-2 text-[10px] sm:py-2"
                  >
                    Transaction History
                  </Link>
                  <Link
                    to={`/pin/${userName}`}
                    className="bg-blue-800 text-zinc-200 sm:text-sm sm:font-bold rounded-lg px-2 text-[10px] sm:py-2"
                  >
                    update upi pin
                  </Link>
                </div>
              )}
            </div>
            <div>
              <InputComponent
                label={"Users"}
                placeholder={"search users"}
                onChange={(e) => setInput(e.target.value)}
              />
              {users.map((user, idx) => (
                <UserDislay key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// user component here.
function UserDislay({ user }) {
  const firstLetter = user.firstName[0];
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2 border-b p-2">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
          <div className="text-zinc-100">{firstLetter}</div>
        </div>
        <div className="pl-2 text-lg">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <ButtonComponent
        label={"Send Money"}
        onClick={(e) =>
          navigate(
            `/sendMoney?id=${user.id}&name=${user.firstName} ${user.lastName}`
          )
        }
      />
    </div>
  );
}
