import {
  Box,
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { EventsContext } from "../EventsContext";
import { Participant } from "./Participant";

export const Participants = () => {
  const { eventsDispatch, fetchedParticipants } = useContext(EventsContext);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

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
              Participants
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date of birth</TableCell>
                  <TableCell>Event name</TableCell>
                  <TableCell>Adjust</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedParticipants.map((participant) => (
                  <Participant
                    key={participant._id}
                    participant={participant}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      )}
    </>
  );
};
