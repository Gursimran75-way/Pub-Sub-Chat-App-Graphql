import { findUserById } from "../User/user.services";
import Message from "./message.model";

export const createMessage = async (args: any, context: any) => {
  try {
    if (!context.isLoggedIn) {
      throw new Error("Pls Login First");
    }

    const { receiverId, content } = args.input;

    if (!receiverId || !content) {
      throw new Error("ReceiverId and Content are required");
    }

    const senderUser = await findUserById(context.userId);
    const receiverUser = await findUserById(receiverId);
    if (!senderUser || !receiverUser) {
      throw new Error("User not found");
    }

    const message = await Message.create({
      content: content,
      sender: context.userId,
      receiver: receiverId,
    });
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name email")
      .populate("receiver", "name email");

    return populatedMessage;
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(`Login failed ${error}`);
  }
};

export const chatMessages = async (args: any, context: any) => {
  try {
    if (!context.isLoggedIn) {
      throw new Error("Pls Login First");
    }

    const { receiverId } = args.input;
    const senderId = context.userId;

    if (!receiverId) {
      throw new Error("ReceiverId is required");
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .populate("receiver", "name email"); //ascending order

    return messages;
  } catch (error) {
    throw new Error(`Error fetching users ${error}`);
  }
};
