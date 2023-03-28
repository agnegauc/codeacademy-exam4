import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Card, CardContent, ToggleButton, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import { EventsContext } from "../EventsContext";
import type { TEventProps } from "./types";

export const Event: FC<TEventProps> = ({ event }) => {
  const { fetchedParticipants } = useContext(EventsContext);
  const [participants, setParticipants] = useState<any[]>([]);
  const [isViewActive, setIsViewActive] = useState(false);

  const handleViewParticipants = () => {
    const newParticipants = fetchedParticipants.filter(
      (participant) => participant.eventName === event.eventName
    );

    setParticipants(newParticipants);
    setIsViewActive((prevIsViewActive) => !prevIsViewActive);
  };

  const ParticipantList = () => {
    return (
      <>
        {participants.map((participant) => (
          <p key={participant._id}>{participant.fullName}</p>
        ))}
      </>
    );
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            color="textSecondary"
            display="flex"
            justifyContent="space-between"
            gutterBottom
          >
            {event.eventName}
            <ToggleButton
              value="check"
              size="small"
              onClick={handleViewParticipants}
            >
              <KeyboardArrowDownIcon />
            </ToggleButton>
          </Typography>
          <Typography color="textSecondary" variant="caption" gutterBottom>
            {isViewActive && participants.length > 0 && <ParticipantList />}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
