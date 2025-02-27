import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserCards from "../components/UserCards";
import { MESSAGE_SENT } from "../graphql/subscription";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "../Store/Slices/dataSlice";
import toast from "react-hot-toast";
import { RootState } from "../Store/store";

const DashboardLayout = () => {
  const {loggedInUser, currentChatUser} = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const {
    data: newMsg,
    loading: newMsgLoading,
    error: newMsgError,
  } = useSubscription(MESSAGE_SENT, {
    onSubscriptionData: (data) => {
      console.log(data,"................................");
      if (loggedInUser && currentChatUser) {
        if (
          (currentChatUser.id ==
            data.subscriptionData.data.messageSent.receiver.id &&
            loggedInUser.id ==
              data.subscriptionData.data.messageSent.sender.id) ||
          (currentChatUser.id ==
            data.subscriptionData.data.messageSent.sender.id &&
            loggedInUser.id ==
              data.subscriptionData.data.messageSent.receiver.id)
        ) {
          const el = data.subscriptionData.data.messageSent;
          const obj = {
            content: el.content,
            id: el.id,
            senderName: el.sender.name,
            receiverName: el.receiver.name,
            senderId: el.sender.id,
            receiverId: el.receiver.id,
            createdAt: el.createdAt,
          };
          dispatch(updateMessages({message: obj}))
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <CssBaseline />
      <Box
        display={"flex"}
        height="100vh"
        width="100vw"
        sx={{
          backgroundColor: "#c9f8f5",
        }}
      >
        <UserCards />
        <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
