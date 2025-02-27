import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setCurrentChatUser, setMessages } from "../Store/Slices/dataSlice";

const Header = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "12px",
          backgroundColor: "snow",
          // borderBottom: "2px solid black",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 0px 30px rgba(15, 15, 15, 0.84)",
          padding: "3px",
        }}
      >
        <Toolbar>
          {/* Profile Avatar */}
          <Avatar
            sx={{
              mr: 2,
              width: 45,
              height: 45,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
            alt={name}
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
          />

          {/* Username */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "black" }}
          >
            {name}
          </Typography>

          {/* Close Button */}
          <IconButton
            onClick={() => {
              dispatch(setCurrentChatUser({ currentChatUser: {} }));
              dispatch(setMessages({ messages: [] }));
              navigate("/app");
            }}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#d32f2f",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
