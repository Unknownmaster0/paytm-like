import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { SendMoney } from "./Pages/SendMoney";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainComponent />
      </div>
    </BrowserRouter>
  );
}

function MainComponent() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sendmoney" element={<SendMoney />} />
    </Routes>
  );
}

export default App;
