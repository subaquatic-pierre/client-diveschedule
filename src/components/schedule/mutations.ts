import { gql } from "@apollo/client";
import {
  bookingFragment,
  profileFragment,
} from "../../views/schedule/fragments";

const UserFragment = gql`
  fragment UserFragment on UserType {
    email
    password
    profile {
      fullName
      certificationLevel
      equipment
    }
  }
`;

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
    $equipment: String
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

export const EDIT_USER = gql`
  ${UserFragment}
  mutation EditUser(
    $id: ID!
    $fullName: String
    $email: String
    $certificationLevel: String
    $equipment: String
  ) {
    editUser(
      id: $id
      fullName: $fullName
      email: $email
      certificationLevel: $certificationLevel
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const CREATE_USER = gql`
  ${UserFragment}
  mutation CreateUser(
    $fullName: String
    $email: String
    $certificationLevel: String
    $equipment: String
  ) {
    createUser(
      fullName: $fullName
      email: $email
      certificationLevel: $certificationLevel
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const EDIT_DIVE_TRIP_DETAIL = gql`
  mutation EditDiveTripDetail(
    $id: ID!
    $diveSite1: String
    $diveSite2: String
    $diveGuides: [ID]
  ) {
    editTripDetail(
      id: $id
      diveSite1: $diveSite1
      diveSite2: $diveSite2
      diveGuides: $diveGuides
    ) {
      tripDetail {
        id
      }
    }
  }
`;

export const CREATE_DIVE_TRIP_DETAIL = gql`
  mutation CreateDiveTripDetail(
    $diveSite1: String
    $diveSite2: String
    $diveGuides: [ID]
    $date: Date
    $time: String
    $tripType: String
  ) {
    createTripDetail(
      diveSite1: $diveSite1
      diveSite2: $diveSite2
      diveGuides: $diveGuides
      date: $date
      time: $time
      tripType: $tripType
    ) {
      tripDetail {
        id
      }
    }
  }
`;
