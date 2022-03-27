const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user){
        const userInfo = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate("savedBooks")
        .populate("bookCount");
        
        return userInfo;
    }
    throw new AuthenticationError("User is not logged in");
  },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("savedBooks")
        .populate("bookCount");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("savedBooks")
        .populate("bookCount");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args.user);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user, password);
      return { token, user };
    },
    saveBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId }},
          { new: true })
          .populate('savedBooks');
          return updatedUser;
        }
        throw new AuthenticationError("You must be logged in");
      },

      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: bookId }},
            { new: true })
            .populate('savedBooks');
            return updatedUser;
          }
          throw new AuthenticationError("You must be logged in");
      }
      }
    }


module.exports = resolvers;
