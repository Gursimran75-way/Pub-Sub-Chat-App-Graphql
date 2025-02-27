import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [signUpFunc, { data, loading, error }] = useMutation(SIGNUP, {
    onCompleted: () => {
      toast.success("SignUp Successful");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    //   console.log(signUpFormData)
    signUpFunc({
      variables: {
        input: { ...signUpFormData },
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
        <Typography variant="h5">SignUp: </Typography>
        <TextField
          size="small"
          label="name"
          variant="outlined"
          type="text"
          name="name"
          value={signUpFormData.name}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          size="small"
          label="email"
          variant="outlined"
          type="email"
          name="email"
          value={signUpFormData.email}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          size="small"
          label="password"
          variant="outlined"
          type="password"
          name="password"
          value={signUpFormData.password}
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
          SignUp
        </Button>
        <Box display={"flex"} justifyContent={"end"}>
          <Link to="/auth/login">Already have an account? Login</Link>
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
