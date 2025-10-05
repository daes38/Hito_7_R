import { createContext, useState } from "react";

export const UserContext = createContext();

const KEY = "mm_token";
const STORE = sessionStorage; 

const UserProvider = ({ children }) => {
  // Si no hay valor guardado => "1" (true) para simular sesión iniciada
  const [token, setToken] = useState(() => (STORE.getItem(KEY) ?? "1") === "1");

  const login = () => {
    setToken(true);
    STORE.setItem(KEY, "1");
  };

  const logout = () => {
    setToken(false);
    STORE.setItem(KEY, "0");
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
