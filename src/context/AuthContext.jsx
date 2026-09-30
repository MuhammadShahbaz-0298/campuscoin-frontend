import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem("cc_user") || sessionStorage.getItem("cc_user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const value = useMemo(
    () => ({
      user,
      login(data, remember = true) {
        const primary = remember ? localStorage : sessionStorage;
        const secondary = remember ? sessionStorage : localStorage;
        try {
          primary.setItem("cc_token", data.token);
          primary.setItem("cc_user", JSON.stringify(data.user));
          secondary.removeItem("cc_token");
          secondary.removeItem("cc_user");
        } catch (error) {
          /* ignore */
        }
        setUser(data.user);
      },
      logout() {
        try {
          localStorage.removeItem("cc_token");
          localStorage.removeItem("cc_user");
          sessionStorage.removeItem("cc_token");
          sessionStorage.removeItem("cc_user");
        } catch (error) {
          /* ignore */
        }
        setUser(null);
      },
      updateUser(nextUser) {
        try {
          const primary =
            localStorage.getItem("cc_token") !== null ? localStorage : sessionStorage;
          primary.setItem("cc_user", JSON.stringify(nextUser));
        } catch (error) {
          /* ignore */
        }
        setUser(nextUser);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
