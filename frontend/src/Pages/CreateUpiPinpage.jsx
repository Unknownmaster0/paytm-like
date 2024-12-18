import { useEffect, useState } from "react";
import { AppBar } from "../Components/AppBarComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../url";
import Spinner from "../Components/Spinner";

const token = localStorage.getItem("token");
export const CreateUpiPin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, []);

  const onClickHandler = async () => {
    if (pin.length < 4 || pin.length > 4) {
      alert("Pin must be of length 4");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/account/createUpiPin`,
        {
          pin,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const response = res.data;
      if (!response.success) {
        alert("Error creating pin");
        return;
      }

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen flex flex-col">
          <div>
            <AppBar username={userName} logout={true} />
          </div>
          <div className="flex-grow h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div>
                <p className="text-sm font-semibold text-zinc-300">
                  Upi pin must be of 4 length only
                </p>
                <InputComponent
                  label={"Create Your Upi Pin"}
                  placeholder={"1234"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
              <button
                onClick={onClickHandler}
                className="bg-black text-white font-bold py-2 px-4 border rounded hover:bg-gray-700 w-[120px]"
              >
                {"Create Pin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
