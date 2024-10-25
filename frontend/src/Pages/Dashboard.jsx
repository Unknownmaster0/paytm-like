import { useCallback, useEffect, useMemo, useState } from "react";
import { AppBar } from "../Components/AppBarComponent";
import { Balance } from "../Components/BalanceComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../url";
import Spinner from "../Components/Spinner";
import { validateUser } from "../ApiCalls/validate";

export const Dashboard = function () {
  const [inputVal, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [authenciated, setAuthenciated] = useState(false);
  const [balance, setBalance] = useState(null);
  const [userName, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = validateUser({ token });

        if (response.success) {
          setAuthenciated(true);
          setUsername(res.data.name);
          setBalance(res.data.balance);
        } else {
          navigate("/signin");
          return;
        }
      } catch (err) {
        console.error(`Error while validation of the user ${err}`);
        navigate("/signin");
        return;
      }
    })();
  }, [navigate]);

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

  console.log(`username: ${userName}`);

  return (
    <div>
      {userName ? <AppBar username={userName} /> : <AppBar />}
      <div className="px-10 py-2">
        <Balance balance={balance} />
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
  );
};

// user component here.
function UserDislay({ user }) {
  const firstLetter = user.firstName[0];
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-2">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center">
          <div className="text-zinc-100">{firstLetter}</div>
        </div>
        <div className="pl-2">
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
