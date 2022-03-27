// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID
    authors: String
    description: String
    image: String
    link: String
    title: String
    bookId: String
}

input savedBook {
    authors: String
    description: String
    bookId: String
    image: String
    link: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
    savedBook(_id: ID!): Book
}
type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username: String!, email: String!, password: String!):Auth
    saveBook(userId: ID!, input: savedBook): Book
    removeBook(bookId: ID!):User
}
type Auth {
    token: ID!
    user: User

}`;

// export the typeDefs
module.exports = typeDefs;