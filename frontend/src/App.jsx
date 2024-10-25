import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./Pages/SigninPage";
import { SendMoney } from "./Pages/SendMoney";
import { Dashboard } from "./Pages/Dashboard";
import { SignupPage } from "./Pages/SignupPage";
import { CreateUpiPin } from "./Pages/CreateUpiPinpage";
import { RenderTransaction } from "./Components/RenderTransaction";
import { PageError } from "./Pages/PageError";

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
      <Route path="/" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sendmoney" element={<SendMoney />} />
      <Route path="/pin/:userName" element={<CreateUpiPin />} />
      <Route path="/render/:userName" element={<RenderTransaction />} />
      <Route path="/*" element={<PageError />} />
    </Routes>
  );
}

export default App;
