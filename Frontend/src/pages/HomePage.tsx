import { Box, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="80%"
      height="100vh"
      sx={{
        background: "snow",
        borderRadius: "15px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
        color: "white",
        textAlign: "center",
        padding: "40px",
        animation: "fadeIn 0.8s ease-in-out",
      }}
    >
      <Typography variant="h2" fontWeight="bold" color="black">
        Welcome to the Chat App
      </Typography>
      <Typography variant="h6" mt={2} color="black" sx={{ opacity: 0.9 }}>
        Select a conversation from the sidebar to start chatting.
      </Typography>
    </Box>
  );
};

export default HomePage;
