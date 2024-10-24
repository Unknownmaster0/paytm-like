import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../url";
import Spinner from "../Components/Spinner";

export const Signin = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <TopBar label={"Sign In"} />
        <TopBarText text={"Enter the details to "} to={"signin"} />
        <InputComponent
          onChange={(e) => setUsername(e.target.value)}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <InputComponent
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={""}
        />
        <ButtonComponent
          label={"Sign In"}
          onClick={async () => {
            {
              loading ? <Spinner /> : null;
            }
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", `Bearer ${response.data.data}`);

              if (response.data.success) {
                setLoading(false);
                navigate("/dashboard");
                return;
              }
            } catch (error) {
              alert(error.message);
            }
          }}
        />
        <BottomTexts text={"Create Account?"} buttonText={"SignUp"} to={"/"} />
      </div>
    </div>
  );
};
