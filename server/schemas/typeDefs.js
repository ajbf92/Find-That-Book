// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    savedBooks: [bookSchema]
}

type bookSchema {
    _id: ID
    authors: String
    description: String
    image: String
    link: String
    title: String
}

type Query {
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [bookSchema]
    savedBook(_id: ID!): bookSchema
}`;

// export the typeDefs
module.exports = typeDefs;