import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { PageProvider, Pages } from "../context/PageContext";
import { UserProvider } from "../context/UserContext";
import { checkCookie } from "../util/helpers";
import AppRadit from "./AppRadit";
import ChatPage from "./Chat";
import HelpPage from "./Help";
import ProfilePage from "./Profile";
import SettingsPage from "./Settings";
import SignInPage from "./SignIn";

export default function StartPage() {
  const [page, setPage] = useState<Pages>("empty");
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    console.log("Page change:", { page });
  }, [page]);

  useEffect(() => {
    if (checkCookie("token")) {
      const cookies = Cookies.get();
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
      console.log("isi cookies", { cookies, user });
      setToken(cookies?.token);
      setPage("chat");
    } else {
      setPage("login");
    }
    return () => {};
  }, []);

  return (
    <PageProvider
      page={page}
      setPage={setPage}
      token={token}
      setToken={setToken}
    >
      <UserProvider user={user} token={token} setUser={setUser}>
        {page === "empty" && <></>}
        {page === "login" && <SignInPage />}
        {page === "chat" && <ChatPage />}
        {/* {page === "chat" && <AppRadit />} */}
        {page === "help" && <HelpPage />}
        {page === "profile" && <ProfilePage />}
        {page === "settings" && <SettingsPage />}
        <Toaster position='top-center' />
      </UserProvider>
    </PageProvider>
  );
}
