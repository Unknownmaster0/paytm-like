import { AppBar } from "../Components/AppBarComponent";
import { Balance } from "../Components/BalanceComponent";
import { InputComponent } from "../Components/InputBoxComponent";

export const Dashboard = function ({ balance }) {
  return (
    <div>
      <AppBar />
      <div className="px-10 py-2">
        <Balance balance={balance} />
        <InputComponent label={"Users"} placeholder={"search users"} />
      </div>
    </div>
  );
};
