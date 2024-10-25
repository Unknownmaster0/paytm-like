import { ButtonComponent } from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

export const AppBar = function ({ username = null, logout = false }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default md:p-6 xl:p-7.5 flex justify-between">
      <div className="font-bold sm:text-2xl text-sm">Payment App</div>
      {username && (
        <div className="flex sm:space-x-4 space-x-2 items-center sm:relative">
          <div className="text-lg">Hello</div>
          <div className="border-2 border-blue-400 rounded-full h-10 w-10 flex justify-center items-center">
            <div className="text-2xl">{username[0]}</div>
          </div>
          {logout && (
            <ButtonComponent
              label={"Log out"}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
