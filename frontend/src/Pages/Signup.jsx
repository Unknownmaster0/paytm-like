import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";
import { useState } from "react";
import axios from "axios";

export const Signup = function () {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <TopBar label={"Sign Up"} />
        <TopBarText text={"Enter the details to "} to={"signup"} />
        <InputComponent
          onChange={(e) => setFirstName(e.target.value)}
          label={"First Name"}
          placeholder={"John"}
        />
        <InputComponent
          onChange={(e) => setLastName(e.target.value)}
          label={"Last Name"}
          placeholder={"Doe"}
        />
        <InputComponent
          onChange={(e) => setEmail(e.target.value)}
          label={"Email"}
          placeholder={"johndoe@gmail.com"}
        />
        <InputComponent
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={""}
        />
        <ButtonComponent
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:8000/api/v1/user/signup",
              {
                firstName,
                lastName,
                username: email,
                password,
              }
            );

            localStorage.setItem("token", `Bearer ${response.data.data}`);
          }}
          label={"Sign Up"}
        />
        <BottomTexts
          text={"Already have an account?"}
          buttonText={"sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
