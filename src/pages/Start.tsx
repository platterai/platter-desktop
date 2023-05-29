import { useEffect, useState } from "react";
import { PageProvider, Pages } from "../context/PageContext";
import { checkCookie } from "../util/helpers";
import ChatPage from "./Chat";
import HelpPage from "./Help";
import SettingsPage from "./Settings";
import SignInPage from "./SignIn";

export default function StartPage() {
  const [page, setPage] = useState<Pages>("login");

  useEffect(() => {
    console.log("Page change:", { page });
  }, [page]);

  useEffect(() => {
    if (page === "login" && checkCookie("token")) {
      setPage("chat");
    }
    return () => {};
  }, []);

  return (
    <PageProvider page={page} setPage={setPage}>
      {page === "login" && <SignInPage />}
      {page === "chat" && <ChatPage />}
      {page === "help" && <HelpPage />}
      {page === "settings" && <SettingsPage />}
    </PageProvider>
  );
}
