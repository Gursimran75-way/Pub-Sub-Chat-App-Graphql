import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
        width="100vw"
        sx={{
          backgroundColor: "lightgray",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Authlayout;
