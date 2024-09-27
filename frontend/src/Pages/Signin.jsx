import { TopBar } from "../Components/TopbarComponent";
import { TopBarText } from "../Components/TobBarTextComponent";
import { InputComponent } from "../Components/InputBoxComponent";
import { ButtonComponent } from "../Components/ButtonComponent";
import { BottomTexts } from "../Components/BottomTextComponent";

export const Signin = function () {
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <TopBar label={"Sign In"} />
        <TopBarText text={"Enter the details to "} to={"signin"} />
        <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} />
        <InputComponent label={"Password"} placeholder={""} />
        <ButtonComponent label={"Sign In"} />
        <BottomTexts
          text={"Create Account?"}
          buttonText={"SignUp"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
