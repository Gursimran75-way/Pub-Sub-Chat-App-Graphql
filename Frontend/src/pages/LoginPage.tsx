import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoggedIn, setLoggedInUser, setToken } from "../Store/Slices/dataSlice";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginFunc, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      toast.success("Login Successful");
      localStorage.setItem("accessToken", JSON.stringify(data.login.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.login.refreshToken));
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      dispatch(
        setToken({
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        })
      );
      dispatch(setLoggedInUser({loggedInUser: data.login.loggedInUser}))
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    loginFunc({
      variables: {
        input: { ...loginFormData },
      },
    });
  };
  return (
    <>
      <Box
        // type={FormData}
        display={"flex"}
        flexDirection={"column"}
        width={"30%"}
        gap={"15px"}
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5">Login: </Typography>
        <TextField
          size="small"
          label="email"
          variant="outlined"
          type="email"
          name="email"
          value={loginFormData?.email}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          size="small"
          label="password"
          variant="outlined"
          type="password"
          name="password"
          value={loginFormData?.password}
          onChange={(e) => handleChange(e)}
        />
        <Divider />
        <Button
          onClick={() => handleSubmit()}
          loading={loading}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
        <Box display={"flex"} justifyContent={"end"}>
          <Link to="/auth/register">Don't have an account? Register</Link>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
