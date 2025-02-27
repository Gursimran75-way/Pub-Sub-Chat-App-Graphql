import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the state
interface MessageType {
  content: string;
  id: string;
  senderName: string;
  receiverName: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

interface UserType {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any; // To allow additional properties if needed
}

interface ChatState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  messages: any;
  currentChatUser: any;
  loggedInUser: any;
}

// Initial state with types
const initialState: ChatState = {
  isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  accessToken: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken") as string)
    : null,
  refreshToken: localStorage.getItem("refreshToken")
    ? JSON.parse(localStorage.getItem("refreshToken") as string)
    : null,
  loading: false,
  messages: [],
  currentChatUser: {},
  loggedInUser: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setMessages: (state, action: PayloadAction<{ messages: any }>) => {
      state.messages = action.payload.messages;
    },
    updateMessages: (state, action: PayloadAction<{ message: any }>) => {
      state.messages = [...state.messages, action.payload.message];
    },
    setCurrentChatUser: (state, action: PayloadAction<{ currentChatUser: any }>) => {
      state.currentChatUser = action.payload.currentChatUser;
    },
    setLoggedInUser: (state, action: PayloadAction<{ loggedInUser: any }>) => {
      state.loggedInUser = action.payload.loggedInUser;
    },
  },
});

// Export actions
export const {
  setIsLoggedIn,
  setToken,
  setLoading,
  setMessages,
  updateMessages,
  setCurrentChatUser,
  setLoggedInUser,
} = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
