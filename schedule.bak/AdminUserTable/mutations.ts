import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($ids: [ID]!) {
    deleteUser(ids: $ids) {
      deleted
      ids
    }
  }
`;
