import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
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
            const response = await axios.post(
              "http://localhost:8000/api/v1/user/signin",
              {
                username,
                password,
              }
            );
            localStorage.setItem("token", `Bearer ${response.data.data}`);

            if (response.data.success) {
              navigate("/dashboard");
              return;
            }
          }}
        />
        <BottomTexts
          text={"Create Account?"}
          buttonText={"SignUp"}
          to={"/"}
        />
      </div>
    </div>
  );
};
