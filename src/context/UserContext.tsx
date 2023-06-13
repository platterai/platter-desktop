import React, { ReactNode, createContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (e: any) => void;
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({
  user,
  setUser,
  children,
}) => {
  return (
    <UserContext.Provider value={{ user, setUser, children }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
