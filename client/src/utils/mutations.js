import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $input: savedBook) {
    saveBook(userId: $ID, input: $savedBook) {
      authors: String
      description: String
      bookId: String
      image: String
      link: String
    }
  }
`;

export const REMOVE_BOOK = gql` 
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $ID) {
      authors: String
      description: String
      image: String
      link: String
    }
  }`;
