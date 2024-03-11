import { createContext, useContext, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContext {
  user: User | null;
  saveUser: (user: User | null) => void;
}

const authContext = createContext({} as AuthContext);

const useAuth = () => useContext(authContext);

const { Provider } = authContext;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const saveUser = (user: User | null) => {
    setUser(user);
  };

  return <Provider value={{ user, saveUser }}>{children}</Provider>;
};

export { useAuth, AuthProvider };
