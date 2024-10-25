import { ButtonComponent } from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

export const AppBar = function ({ username = null, logout = false }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5 flex justify-evenly">
      <div className="font-bold text-2xl">Payment App</div>
      {username && (
        <div className="flex justify-evenly w-32 items-center flex-grow sm:relative">
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
