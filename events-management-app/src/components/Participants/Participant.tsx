import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { FC, useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import type { TParticipantProps } from "./types";
import axios from "axios";
import type { TParticipant } from "../EventsContext/types";
import { EventsContext } from "../EventsContext";
import { AuthContext } from "../AuthContext";

export const Participant: FC<TParticipantProps> = ({ participant }) => {
  const { eventsDispatch } = useContext(EventsContext);
  const { token } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedParticipantData, setEditedParticipantData] =
    useState<TParticipant>({
      fullName: participant.fullName,
      eventName: participant.eventName,
      email: participant.email,
      age: participant.age,
      dateOfBirth: participant.dateOfBirth,
    });

  const participantId = participant._id;

  const handleEditParticipant = () => {
    setIsEditMode(true);
  };

  const handleSaveEditedParticipant = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .patch(
        `http://localhost:8000/participants/${participantId}`,
        editedParticipantData,
        {
          headers: headers,
        }
      )
      .then(() => {
        setIsEditMode(false);
        alert(`Participant successfully updated`);
        eventsDispatch({
          type: "editParticipant",
          payload: { participantId, editedParticipantData },
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const handleParticipantChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setEditedParticipantData({
      ...editedParticipantData,
      [prop]: event?.target.value,
    });
  };

  const handleDeleteParticipant: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`http://localhost:8000/participants/${participantId}`, {
        headers,
      })
      .then(() => {
        alert(`Participant successfully deleted`);

        eventsDispatch({
          type: "deleteParticipant",
          payload: { participantId },
        });
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <TableRow>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedParticipantData.fullName ?? ""}
            onChange={(event) => handleParticipantChanges(event, "fullName")}
          />
        ) : (
          participant.fullName
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedParticipantData.email ?? ""}
            onChange={(event) => handleParticipantChanges(event, "email")}
          />
        ) : (
          participant.email
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedParticipantData.dateOfBirth ?? ""}
            onChange={(event) => handleParticipantChanges(event, "dateOfBirth")}
          />
        ) : (
          participant.dateOfBirth
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <TextField
            value={editedParticipantData.eventName ?? ""}
            onChange={(event) => handleParticipantChanges(event, "eventName")}
          />
        ) : (
          participant.eventName
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <>
            <IconButton aria-label="save" onClick={handleSaveEditedParticipant}>
              <SaveIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="edit" onClick={handleEditParticipant}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteParticipant}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
