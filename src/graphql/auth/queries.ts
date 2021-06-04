import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $fullName: String) {
    createUser(email: $email, password: $password, fullName: $fullName) {
      user {
        email
        profile {
          fullName
        }
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    deleteTokenCookie {
      deleted
    }
  }
`;

export const AUTH_VIEWER_QUERY = gql`
  query Viewer {
    viewer {
      id
      email
      isAdmin
      profile {
        fullName
        equipment
        certLevel
      }
    }
  }
`;
