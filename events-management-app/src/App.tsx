import { useReducer } from "react";
import {
  AuthContext,
  authReducer,
  EventsContext,
  eventsReducer,
  MainRouter,
} from "./components";

export const App = () => {
  const [eventsState, eventsDispatch] = useReducer(eventsReducer, {
    fetchedEvents: [],
    fetchedParticipants: [],
  });

  const token = localStorage.getItem("token");
  const INITIAL_STATE = token
    ? { isAuthenticated: true, token: token }
    : { isAuthenticated: false, token: null };

  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      <EventsContext.Provider value={{ ...eventsState, eventsDispatch }}>
        <MainRouter />
      </EventsContext.Provider>
    </AuthContext.Provider>
  );
};
