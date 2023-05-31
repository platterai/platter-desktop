import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import PageContext from "../../../context/PageContext";
import UserContext from "../../../context/UserContext";

type LogoutProps = {};

const Logout = ({}: LogoutProps) => {
  const { setPage } = useContext(PageContext)!;
  const { setUser } = useContext(UserContext)!;
  const handleLogout = async () => {
    Cookies.remove("token");
    localStorage.removeItem("selectedAvatarPath");
    localStorage.removeItem("user");
    setUser({});
    toast.success("Logout success, redirecting...");
  };

  return (
    <div>
      <div className='mb-8 h5'>Are you sure you want to logout?</div>
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
