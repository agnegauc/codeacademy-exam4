import { Dispatch } from "react";

export type TAuthContext = {
  isAuthenticated: boolean;
  token: string | null;
  authDispatch: Dispatch<TAuthAction>;
};

export type TAuthAction = {
  type: "login" | "logout";
  payload?: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  token: any;
};
