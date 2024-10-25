import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../url";

export const Signup = ({ setLoading }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
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
        {isVisible && (
          <div className="text-red-600">
            Password should contain at least one Uppercase, Lowercase, Special
            Characters, and Numbers, and be a minimum of 8 in length.
          </div>
        )}
        <InputComponent
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"********"}
        />
        <ButtonComponent
          onClick={async () => {
            const pattern = new RegExp(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
            );
            if (password.length < 8 || !pattern.test(password)) {
              setIsVisible(true);
              return;
            }
            setLoading(true);
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                {
                  firstName,
                  lastName,
                  username: email,
                  password,
                }
              );

              if (response.data.success) {
                localStorage.setItem(
                  "token",
                  `Bearer ${response.data.data.token}`
                );
                navigate(`/pin/${firstName}`);
                setLoading(false);
              } else {
                alert("Signup failed, please check your inputs.");
              }
            } catch (error) {
              alert(
                "Enter valid input. " + error.response?.data?.message ||
                  error.message
              );
            } finally {
              setLoading(false);
            }
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
