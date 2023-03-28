import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { EventsContext } from "../EventsContext";
import type { TParticipant } from "../EventsContext/types";

export const AddParticipant = () => {
  const { fetchedEvents } = useContext(EventsContext);
  const { token } = useContext(AuthContext);
  const [newParticipant, setNewParticipant] = useState<TParticipant>({
    fullName: null,
    eventName: null,
    email: null,
    age: null,
    dateOfBirth: null,
  });

  const resetForm = () => {
    setNewParticipant({
      fullName: null,
      eventName: null,
      email: null,
      age: null,
      dateOfBirth: null,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setNewParticipant({ ...newParticipant, [prop]: event.target.value });
  };

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setNewParticipant({ ...newParticipant, [prop]: +event.target.value });
  };

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8000/participants", newParticipant, {
        headers: headers,
      })
      .then(() => {
        alert(`Participant successfully added`);

        resetForm();
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <>
      <Container>
        <Typography variant="h4" py={10} gutterBottom>
          Add participant
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitForm}
        >
          <TextField
            required
            label="Full name"
            value={newParticipant.fullName ?? ""}
            onChange={(event) => handleInputChange(event, "fullName")}
          />
          <TextField
            select
            required
            label="Event"
            value={newParticipant.eventName ?? ""}
            onChange={(event) =>
              setNewParticipant({
                ...newParticipant,
                eventName: event.target.value,
              })
            }
          >
            {fetchedEvents.map((event) => (
              <MenuItem key={event.eventId} value={event.eventName ?? ""}>
                {event.eventName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Email"
            value={newParticipant.email ?? ""}
            onChange={(event) => handleInputChange(event, "email")}
          />
          <TextField
            required
            label="Age"
            type="number"
            value={newParticipant.age ?? ""}
            onChange={(event) => handleNumberInputChange(event, "age")}
          />
          <TextField
            required
            label="Date of birth"
            value={newParticipant.dateOfBirth ?? ""}
            onChange={(event) => handleInputChange(event, "dateOfBirth")}
          />
          <Button
            variant="outlined"
            color="inherit"
            type="submit"
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
              maxWidth: 200,
            }}
          >
            Add participant
          </Button>
        </Box>
      </Container>
    </>
  );
};
