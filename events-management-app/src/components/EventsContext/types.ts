import { Dispatch } from "react";

export type TEvent = {
  eventId: number | null;
  eventName: string | null;
};

export type TParticipant = {
  _id?: string | null;
  fullName: string | null;
  eventName: string | null;
  email: string | null;
  age: number | null;
  dateOfBirth: string | null;
};

export type TEventsContext = {
  fetchedEvents: Readonly<TEvent[]>;
  fetchedParticipants: Readonly<TParticipant[]>;
  eventsDispatch: Dispatch<TEventsAction>;
};

export type TEventsAction = {
  type:
    | "setEvents"
    | "setParticipants"
    | "deleteParticipant"
    | "editParticipant";
  payload: {
    fetchedEvents?: TEvent[];
    fetchedParticipants?: TParticipant[];
    participantId?: string | null;
    editedParticipantData?: TParticipant;
  };
};

export type TEventsState = {
  fetchedEvents: Readonly<TEvent[]>;
  fetchedParticipants: Readonly<TParticipant[]>;
};
