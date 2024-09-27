import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { SendMoney } from "./Components/SendMoneyComponent";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <MainComponent /> */}
        {/* <Dashboard balance={"Rs 10,000"} /> */}
        <SendMoney />
      </div>
    </BrowserRouter>
  );
}

function MainComponent() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" />
      <Route path="/sendmoney" />
    </Routes>
  );
}

export default App;
