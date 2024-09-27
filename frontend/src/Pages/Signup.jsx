import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";

export const Signup = function () {
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <TopBar label={"Sign Up"} />
        <TopBarText text={"Enter the details to "} to={"signup"} />
        <InputComponent label={"First Name"} placeholder={"John"} />
        <InputComponent label={"Last Name"} placeholder={"Doe"} />
        <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} />
        <InputComponent label={"Password"} placeholder={""} />
        <ButtonComponent label={"Sign Up"} />
        <BottomTexts
          text={"Already have an account?"}
          buttonText={"sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
