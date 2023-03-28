import { createContext } from "react";
import type { TEventsContext } from "./types";

const INITIAL_VALUE = {
  fetchedEvents: [],
  fetchedParticipants: [],
  eventsDispatch: () => {},
} as const;

export const EventsContext = createContext<TEventsContext>(INITIAL_VALUE);
