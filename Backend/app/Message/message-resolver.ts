import { PubSub, withFilter } from "graphql-subscriptions";
import { chatMessages, createMessage } from "../Message/message.services";

const pubsub = new PubSub();

export const messageResolvers = {
  Mutation: {
    createMessage: async (parent: any, args: any, context: any) => {
      const populatedMessage = await createMessage(args, context);
      pubsub.publish("MESSAGE_SENT", { messageSent: populatedMessage });
      return populatedMessage;
    },
  },

  Query: {
    chatMessages: async (parent: any, args: any, context: any) => {
      return await chatMessages(args, context);
    },
  },

  Subscription: {
      messageSent: {
        // using asyncIterator from PubSub to create the subscription
        subscribe: withFilter(
          () => pubsub.asyncIterableIterator("MESSAGE_SENT"), // Correct way to use asyncIterator
          (payload, variables) => {
            // Optional filter function to handle different subscriptions
            return true; // Allow all events for this example
          }
        ),
      },
    },
};
