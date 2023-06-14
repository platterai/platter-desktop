import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PageProvider, Pages } from "../context/PageContext";
import { UserProvider } from "../context/UserContext";
import { store } from "../redux/store/store";
import {
  checkCookie,
  checkLocalStorageItem,
  getCookieByName,
} from "../util/helpers";
import ChatPage from "./Chat";
import HelpPage from "./Help";
import SettingsPage from "./Settings";
import SignInPage from "./SignIn";

export default function StartPage() {
  const [page, setPage] = useState<Pages>("");
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    console.log("Page change:", { page });
  }, [page]);

  useEffect(() => {
    if (checkLocalStorageItem("token")) {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
      setPage("chat");
    } else {
      setPage("login");
    }
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <PageProvider page={page} setPage={setPage}>
        <UserProvider user={user} setUser={setUser}>
          <div style={{ height: "100vh" }}>
            {page === "" && <></>}
            {page === "login" && <SignInPage />}
            {page === "chat" && <ChatPage />}
            {page === "help" && <HelpPage />}
            {page === "settings" && <SettingsPage />}
            <Toaster position='top-center' />
          </div>
        </UserProvider>
      </PageProvider>
    </Provider>
  );
}
