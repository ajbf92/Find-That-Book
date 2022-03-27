const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").populate("savedBooks");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args.user);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, {email, password}) => {
    const user = await User.findone({email});
    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const correctPassword = await user.isCorrectPassword(password);
    if (!correctPassword) {
      throw new AuthenticationError('Incorrect credentials');
    }
    const toke = signToken(user, password);
    return {token, user};
    }
  }
  },
};

module.exports = resolvers;
