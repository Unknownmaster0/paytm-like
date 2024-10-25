import { useEffect, useState } from "react";
import { validateUser } from "../ApiCalls/validate";
import { useNavigate } from "react-router-dom";

export const useUserhook = () => {
  const [authenciated, setAuthenciated] = useState(false);
  const [balance, setBalance] = useState(null);
  const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await validateUser({ token });

        if (response.success) {
          setAuthenciated(true);
          setUsername(response.data.name);
          setBalance(response.data.balance);
          setLoading(false);
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

  return {
    userName,
    authenciated,
    balance,
    loading,
  };
};
