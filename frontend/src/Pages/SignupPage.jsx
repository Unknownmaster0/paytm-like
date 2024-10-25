import { AppBar } from "../Components/AppBarComponent";
import { AppPromotion } from "../Components/AppPromotionComponent";
import { Signup } from "../Components/Signup";

export const SignupPage = function () {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <AppBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 flex-grow">
        <div className="flex items-center justify-center h-full">
          <Signup />
        </div>
        <div className="hidden sm:flex items-center justify-center bg-green-200  h-full">
          <AppPromotion />
        </div>
      </div>
    </div>
  );
};
