import { useContext, useState } from "react";
import axios from "axios";
import type { TLoginInput } from "./types";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";

export const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState<TLoginInput>({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setLoginInput({ ...loginInput, [prop]: event?.target.value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/login", {
        email: loginInput.email,
        password: loginInput.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        authDispatch({
          type: "login",
          payload: res.data.token,
        });
      })
      .then(() => {
        alert(`Log in successful`);

        navigate("/events");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" py={10} gutterBottom>
        Log in
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
        onSubmit={handleFormSubmit}
      >
        <TextField
          required
          label="Email"
          type="email"
          onChange={(event) => handleInputChange(event, "email")}
        />
        <TextField
          required
          label="Password"
          type="password"
          onChange={(event) => handleInputChange(event, "password")}
        />

        <Button
          variant="outlined"
          color="inherit"
          size="small"
          type="submit"
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            p: 1,
            maxWidth: 100,
          }}
        >
          Log in
        </Button>
      </Box>
    </Container>
  );
};
