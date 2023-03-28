import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { EventsContext } from "../EventsContext";
import { Event } from "./Event";

export const Events = () => {
  const { eventsDispatch, fetchedEvents } = useContext(EventsContext);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("http://localhost:8000/events", { headers })
      .then((res) =>
        eventsDispatch({
          type: "setEvents",
          payload: { fetchedEvents: res.data },
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));

    axios
      .get("http://localhost:8000/participants", { headers })
      .then((res) =>
        eventsDispatch({
          type: "setParticipants",
          payload: { fetchedParticipants: res.data },
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [eventsDispatch, token]);

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Container>
          <Box py={10}>
            <Typography variant="h4" gutterBottom>
              Events
            </Typography>
            <Grid container spacing={4}>
              {fetchedEvents.map((event) => (
                <Grid item md={6} key={event.eventId}>
                  <Event key={event.eventId} event={event} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};
