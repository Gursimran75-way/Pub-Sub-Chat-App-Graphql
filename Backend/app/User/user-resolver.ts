import { getUsersExceptMe, login, signUp } from "../User/user.services";

export const userResolvers = {
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      return await signUp(args);
    },

    login: async (parent: any, args: any, context: any) => {
      return await login(args, context);
    },
  },

  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await getUsersExceptMe(context);
    },
  },
};
