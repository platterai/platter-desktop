import React, { ReactNode, createContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (e: any) => void;
  token: any;
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({
  user,
  setUser,
  token,
  children,
}) => {
  return (
    <UserContext.Provider value={{ user, setUser, token, children }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
