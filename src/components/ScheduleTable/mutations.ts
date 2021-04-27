import { gql } from "@apollo/client";
import {
  bookingFragment,
  profileFragment,
} from "../../pages/Schedule/fragments";

export const DELETE_BOOKING = gql`
  ${bookingFragment}
  ${profileFragment}
  mutation DeleteBooking($ids: [ID]!) {
    deleteBooking(ids: $ids) {
      bookings {
        ...BookingFragment
      }
    }
  }
`;

export const CREATE_BOOKING = gql`
  ${bookingFragment}
  ${profileFragment}
  mutation CreateBooking(
    $activity: String!
    $userId: ID!
    $tripType: String!
    $date: Date!
    $equipment: String!
    $time: String!
    $instructorId: ID
  ) {
    createBooking(
      activity: $activity
      userId: $userId
      tripType: $tripType
      date: $date
      equipment: $equipment
      time: $time
      instructorId: $instructorId
    ) {
      booking {
        ...BookingFragment
      }
    }
  }
`;

export const EDIT_BOOKING = gql`
  ${bookingFragment}
  ${profileFragment}
  mutation EditBooking(
    $id: ID!
    $activity: String
    $tripType: String
    $date: Date
    $email: String
    $equipment: String
    $time: String
    $instructorId: ID
  ) {
    editBooking(
      id: $id
      activity: $activity
      tripType: $tripType
      date: $date
      email: $email
      equipment: $equipment
      time: $time
      instructorId: $instructorId
    ) {
      booking {
        ...BookingFragment
      }
    }
  }
`;
