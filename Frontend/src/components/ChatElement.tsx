import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentChatUser } from "../Store/Slices/dataSlice";
import { RootState } from "../Store/store";

const ChatElement = ({ el }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentChatUser } =useSelector((state: RootState) => state.chat);
 
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      padding="10px"
      borderRadius="12px"
      sx={{
        cursor: "pointer",
        background: currentChatUser?.id === el.id ? "gray" : "lightgray",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          background: "gray",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.02)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
      onClick={() => {
        dispatch(setCurrentChatUser({ currentChatUser: el }));
        navigate(`/app/receiverId/${el.id}/name/${el.name}`);
      }}
    >
      {/* Avatar */}
      <Avatar
        alt={el.name}
        src={`https://api.dicebear.com/5.x/initials/svg?seed=${el.name}`}
        sx={{
          width: 50,
          height: 50,
          border: "2px solid #1976d2",
        }}
      />

      {/* User Info */}
      <Typography variant="body1" fontWeight="bold" color="text.primary">
        {el.name}
      </Typography>
    </Box>
  );
};

export default ChatElement;
