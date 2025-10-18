import { createContext, useState, useMemo, useCallback } from "react";
import api from "../api/axios";

export const UserContext = createContext();

const TOKEN_KEY = "mm_token";
const EMAIL_KEY = "mm_email";

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem(TOKEN_KEY) || "");
  const [email, setEmail] = useState(sessionStorage.getItem(EMAIL_KEY) || "");
  const isAuth = !!token;

  const save = (t, e) => {
    setToken(t);
    setEmail(e);
    sessionStorage.setItem(TOKEN_KEY, t || "");
    sessionStorage.setItem(EMAIL_KEY, e || "");
  };

  // LOGIN
  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password }); // { email, token }
    save(data.token, data.email);
  }, []);

  // REGISTER
  const register = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/register", { email, password }); // { email, token }
    save(data.token, data.email);
  }, []);

  // GET PROFILE
  const getProfile = useCallback(async () => {
    const { data } = await api.get("/auth/me"); // { email }
    if (data?.email) save(sessionStorage.getItem(TOKEN_KEY) || "", data.email);
    return data;
  }, []);

  // LOGOUT
  const logout = useCallback(() => save("", ""), []);

  const value = useMemo(
    () => ({ token, email, isAuth, login, register, getProfile, logout }),
    [token, email, isAuth, login, register, getProfile, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
