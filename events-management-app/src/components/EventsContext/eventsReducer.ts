import type { TEventsState, TEventsAction } from "./types";

export const eventsReducer = (state: TEventsState, action: TEventsAction) => {
  switch (action.type) {
    case "setEvents": {
      const { fetchedEvents } = action.payload;

      if (Array.isArray(fetchedEvents)) {
        return { ...state, fetchedEvents };
      }

      return state;
    }

    case "setParticipants": {
      const { fetchedParticipants } = action.payload;

      if (Array.isArray(fetchedParticipants)) {
        return { ...state, fetchedParticipants };
      }

      return state;
    }

    case "deleteParticipant": {
      const filteredParticipants = state.fetchedParticipants.filter(
        (participant) => participant._id !== action.payload.participantId
      );

      return {
        ...state,
        fetchedParticipants: filteredParticipants,
      };
    }

    case "editParticipant": {
      const editedParticipants = state.fetchedParticipants.map(
        (participant) => {
          if (participant._id === action.payload.participantId) {
            return { ...participant, ...action.payload.editedParticipantData };
          }
          return participant;
        }
      );

      return {
        ...state,
        fetchedParticipants: editedParticipants,
      };
    }

    default:
      console.log("No case matched");
  }
  return state;
};
