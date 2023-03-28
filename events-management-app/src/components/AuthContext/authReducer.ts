import { TAuthAction, TAuthState } from "./types";

export const authReducer = (state: TAuthState, action: TAuthAction) => {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        token: action.payload,
      };

    case "logout":
      return {
        isAuthenticated: false,
        token: null,
      };
    default:
      console.log("No case matched");
  }
  return state;
};
