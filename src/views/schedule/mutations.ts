import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
    mutation CreateBooking(){
        booking {
        id
        activity
        tripType
        equipment
        diver {
          email
          profile {
            fullName
            certificationLevel
          }
        }
      }
    }
`;

export const EDIT_BOOKING = gql`
  mutation EditBooking($id: ID!) {
    editBooking(id: $ID) {
      booking {
        id
        activity
        tripType
        equipment
        diver {
          email
          profile {
            fullName
            certificationLevel
          }
        }
      }
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleted
  }
`;
