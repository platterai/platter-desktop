import React, { ReactNode, createContext } from "react";

export type Pages = "login" | "chat" | "help" | "settings";

interface PageContextProps {
  page: Pages;
  setPage: (e: Pages) => void;
  children: ReactNode;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<PageContextProps> = ({
  page,
  setPage,
  children,
}) => {
  return (
    <PageContext.Provider value={{ page, setPage, children }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
