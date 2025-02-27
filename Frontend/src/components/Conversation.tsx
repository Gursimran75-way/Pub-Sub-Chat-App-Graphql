import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useQuery } from "@apollo/client";
import { GET_USERS_MESSAGES } from "../graphql/query";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Store/Slices/dataSlice";
import { RootState } from "../Store/store";

// Define the message type
interface MessageType {
  content: string;
  id: string;
  senderName: string;
  receiverName: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

const Conversation: React.FC = () => {
  const receiverID = useSelector((state: RootState) => state.chat.currentChatUser?.id);
  const messages: MessageType[] = useSelector((state: RootState) => state.chat.messages) || [];
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { loading, data } = useQuery(GET_USERS_MESSAGES, {
    variables: { input: { receiverId: receiverID } },
    fetchPolicy: "no-cache",
    skip: !receiverID,
    onCompleted: (data) => {
      const msgs: MessageType[] = data.chatMessages.map((el: any) => ({
        content: el.content,
        id: el.id,
        senderName: el.sender.name,
        receiverName: el.receiver.name,
        senderId: el.sender.id,
        receiverId: el.receiver.id,
        createdAt: el.createdAt,
      }));
      dispatch(setMessages({ messages: msgs }));
    },
  });

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor="white"
      height="calc(100vh - 140px)"
      overflow="auto"
      p={2}
      borderRadius={2}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
    >
      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress size={40} />
        </Box>
      )}

      {/* Messages */}
      {!loading && messages.length > 0 ? (
        messages.map((el) => <Message key={el.id} el={el} />)
      ) : (
        !loading && (
          <Typography textAlign="center" color="gray" mt={5}>
            No messages yet. Start a conversation!
          </Typography>
        )
      )}

      {/* Auto-scroll anchor */}
      <div ref={scrollRef} />
    </Box>
  );
};

export default Conversation;
