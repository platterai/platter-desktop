import React, { ReactNode, createContext } from "react";

export type Pages =
  | "empty"
  | "login"
  | "chat"
  | "help"
  | "settings"
  | "profile";

interface PageContextProps {
  token: string;
  setToken: (e: string) => void;
  page: Pages;
  setPage: (e: Pages) => void;
  children: ReactNode;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<PageContextProps> = ({
  token,
  setToken,
  page,
  setPage,
  children,
}) => {
  return (
    <PageContext.Provider value={{ token, setToken, page, setPage, children }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
