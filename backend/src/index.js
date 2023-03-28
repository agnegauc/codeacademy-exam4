import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import login from "./routes/v1/login.js";
import register from "./routes/v1/register.js";
import events from "./routes/v1/events.js";
import participants from "./routes/v1/participants.js";
import { isAuthorised } from "./middleware/auth.js";

const app = express();

app.use(cors(), express.json());

app.use("/login", login);
app.use("/register", register);
app.use("/events", isAuthorised, events);
app.use("/participants", isAuthorised, participants);

app.get("/", (_, res) => {
  res.send({ message: "Server is running." }).end();
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found." }).end();
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
