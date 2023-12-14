import React, { createContext, useState, ReactNode } from "react";

interface User {
  username: string;
  avatar: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

interface ProviderProps {
  children: ReactNode;
}

const defaultUser: User = {
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f60e.svg/28px-Emoji_u1f60e.svg.png?20170527190449",
  username: "anonymous",
};

export const UserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
