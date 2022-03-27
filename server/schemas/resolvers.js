const { User } = require("../models");

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
  },
};

module.exports = resolvers;
