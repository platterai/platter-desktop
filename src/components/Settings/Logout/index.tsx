import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import PageContext from "../../../context/PageContext";
import UserContext from "../../../context/UserContext";

type LogoutProps = {};

const Logout = ({}: LogoutProps) => {
  const { setPage } = useContext(PageContext)!;
  const { setUser } = useContext(UserContext)!;
  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser({});
    toast.success("Logout success, redirecting...");
  };
  const colormode = useSelector((state: any) => state?.colormode?.colormode);
  return (
    <div>
      <p
        className={`mb-8 text-2xl font-bold ${
          colormode === "dark" ? "text-n-1" : "text-n-7"
        }`}
      >
        Are you sure you want to logout?
      </p>
      <button
        className='btn-red w-full m-0'
        onClick={() => {
          handleLogout();
          setTimeout(() => {
            setPage("login");
          }, 2000);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
