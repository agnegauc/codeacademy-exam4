import { createContext } from "react";
import type { TAuthContext } from "./types";

const INITIAL_VALUE = {
  isAuthenticated: false,
  token: null,
  authDispatch: () => {},
};

export const AuthContext = createContext<TAuthContext>(INITIAL_VALUE);
