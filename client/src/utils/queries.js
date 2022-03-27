import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id: ID
        authors: String
        description: String
        image: String
        link: String
        title: String
        bookId: String
      }
    }
  }
`;
