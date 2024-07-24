import { CameraAlt, Dialpad } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisuallyHiddenComponent from "../components/styles/VisuallyHiddenComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/Validator";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { useDispatch } from "react-redux";
import { userExists, userNotExist } from "../redux/slices/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [loading , setIsLoading] = useState(false);
  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const bio = useInputValidation("");
  const password = useInputValidation('');
  const avatar = useFileHandler('single');
  console.log(import.meta.env.VITE_BASE_URL)

  const dispatch = useDispatch();
  const handleLoginToggle = () => {
    setLogin(!login);
  };

  const handleSignUpsubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append('name',name.value)
    formData.append('username',username.value)
    formData.append('password',password.value)
    formData.append('bio',bio.value)
    formData.append('avatar' , avatar.file);
    try {
      const {data} = await axiosInstance.post('/api/v1/user/create' , formData);
      dispatch(userExists(data.user));
      toast.success(`welcome ${data.user.name}`)
       console.log(data);
    } catch ({response}) {
        dispatch(userNotExist());
        console.log(response?.data?.message)
        toast.error(response?.data?.message)
    }
    finally{
      setIsLoading(false);
    }
  }

  const handleLoginSubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const userdata = {
      username:username.value,
      password:password.value
    }
    try {
      const {data} = await axiosInstance.post('/api/v1/user/login',userdata ,{'Content-type':'application/json'})
      toast.success(`welcome back ${data.user.name}`)
      dispatch(userExists(data.user))
    } catch ({response}) {
      toast.error(response?.data?.message)
      dispatch(userNotExist())
    }
    setIsLoading(false);
  }

  return (
    <Container
      component={"main"}
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginY: `2rem`,
        }}
      >
        {login ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleLoginSubmit}>
              <TextField
                required
                fullWidth
                label="UserName"
                variant="outlined"
                margin="normal"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
                margin="normal"
              />
              {password.error && (
              <Typography color="error" variant="caption">{password.error}</Typography>
            )}
              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                disabled={loading}
                sx={{ marginTop: "1rem" }}
                variant="text"
                fullWidth
                onClick={handleLoginToggle}
              >
                Register instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSignUpsubmit}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avatar.preview}
                />

                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                    color: "white",
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHiddenComponent type="file" onChange={avatar.changeHandler}/>
                  </>
                </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="name"
                variant="outlined"
                margin="normal"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                margin="normal"
              />
              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                required
                fullWidth
                label="Bio"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
                margin="normal"
              />

              <TextField
                required
                fullWidth
                label="Password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                type="password"
                margin="normal"
              />

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                sx={{ marginTop: "1rem" }}
                variant="text"
                fullWidth
                onClick={handleLoginToggle}
                disabled={loading}
              >
                Login instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
