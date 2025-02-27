import { Box, Divider, Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ChatElement from "./ChatElement";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCurrentChatUser,
  setIsLoggedIn,
  setLoggedInUser,
  setMessages,
  setToken,
} from "../Store/Slices/dataSlice";
import { GET_USERS } from "../graphql/query";
import { useQuery } from "@apollo/client";

const UserCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, data } = useQuery(GET_USERS, {
    pollInterval: 600000,//1min
    fetchPolicy: "no-cache",
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"  
      width="22%"
      borderRadius="15px"
      p={2}
      // borderRight="1px solid rgb(153, 15, 15)"
      boxShadow="0px 4px 10px rgba(23, 23, 23, 1)"
      sx={{
        backgroundColor: "snow",
        transition: "all 0.3s ease-in-out",
        // "&:hover": { boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)" },
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        <Avatar sx={{ bgcolor: "#1976d2", width: 45, height: 45 }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>C</Typography>
        </Avatar>
        <Typography variant="h5" fontWeight="bold" ml={1} color="#1976d2">
          Chats
        </Typography>
      </Box>

      <Divider sx={{ my: 1, bgcolor: "#1976d2" }} />

      {/* Chat List */}
      <Box
        display={"flex"}
        padding={1}
        flexDirection={"column"}
        height={"100%"}
        gap={2}
        overflow="auto"
        sx={{
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "#b0bec5 transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#b0bec5", borderRadius: "10px" },
        }}
      >
        {!loading &&
          data?.users.map((el, ind) => <ChatElement el={el} key={ind} />)}
      </Box>

      {/* Footer - Logout */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
        <Tooltip title="Logout">
          <IconButton
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              dispatch(setIsLoggedIn({ isLoggedIn: false }));
            dispatch(setToken({ accessToken: null, refreshToken: null }));
              dispatch(setCurrentChatUser({currentChatUser: {}}));
              dispatch(setMessages({messages: []}));
              dispatch(setLoggedInUser({ loggedInUser: {} }));
              navigate("/auth");
            }}
            sx={{
              bgcolor: "transparent",
              color: "#d32f2f",
              transition: "all 0.3s",
              "&:hover": { bgcolor: "#ffebee", color: "red" },
            }}
          >
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Typography variant="subtitle2" color="gray">
          Logout
        </Typography>
      </Box>
    </Box>
  );
};

export default UserCards;
