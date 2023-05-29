import React, { ReactNode, createContext } from "react";

interface UserContextProps {
  user: any;
  token: any;
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({
  user,
  token,
  children,
}) => {
  return (
    <UserContext.Provider value={{ user, token, children }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
