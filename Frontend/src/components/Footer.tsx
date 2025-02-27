import { Box, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_MESSAGE } from "../graphql/mutation";
import toast from "react-hot-toast";
import { RootState } from "../Store/store";

const Footer = () => {
  const [content, setContent] = useState("");

  const receiverId = useSelector((state: RootState) => state?.chat?.currentChatUser?.id);

  const [sendMsgFunc] = useMutation(CREATE_NEW_MESSAGE, {
    onError: (error) => toast.error(error.message),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (content.trim() === "") {
      toast.error("Please enter a message before sending.");
      return;
    }
    sendMsgFunc({
      variables: {
        input: {
          receiverId: receiverId,
          content: content,
        },
      },
    });
    setContent("");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="whitesmoke"
      p={1}
      borderRadius="12px"
      // borderTop={"2px solid black"}
      boxShadow= "25px 0px 25px rgba(15, 15, 15, 0.84)"
    >
      {/* Message Input */}
      <TextField
        sx={{
          flex: 1,  
          borderRadius: "10px",
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "#1976d2" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
        }}
        size="medium"
        placeholder="Type a message..."
        variant="outlined"
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/* Send Button */}
      <IconButton
        onClick={handleSendMessage}
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          ml: 1,
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "#1565c0" },
          "&:active": { transform: "scale(0.95)" },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
