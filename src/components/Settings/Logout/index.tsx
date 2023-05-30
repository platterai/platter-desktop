import axios from "axios";

type LogoutProps = {};

const Logout = ({}: LogoutProps) => {
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("selectedAvatarPath");
    } catch (error) {
      console.error("Logout error", { error });
    }
  };

  return (
    <div>
      <div className='mb-8 h5'>Are you sure you want to logout?</div>
      <button
        className='btn-red w-full m-0'
        onClick={() => {
          handleLogout();
          // router.replace("/sign-in");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
