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
      certLevel
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
    $diverRole: String!
    $userId: ID!
    $activityType: String!
    $date: Date!
    $equipment: String
    $time: String!
    $instructorId: ID
  ) {
    createBooking(
      diverRole: $diverRole
      userId: $userId
      activityType: $activityType
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
    $diverRole: String
    $activityType: String
    $date: Date
    $email: String
    $equipment: String
    $time: String
    $instructorId: ID
  ) {
    editBooking(
      id: $id
      diverRole: $diverRole
      activityType: $activityType
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
    $certLevel: String
    $equipment: String
  ) {
    editUser(
      id: $id
      fullName: $fullName
      email: $email
      certLevel: $certLevel
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
      activityDetail {
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
    $activityType: String
  ) {
    createTripDetail(
      diveSite1: $diveSite1
      diveSite2: $diveSite2
      diveGuides: $diveGuides
      date: $date
      time: $time
      activityType: $activityType
    ) {
      activityDetail {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  ${UserFragment}
  mutation CreateUser(
    $fullName: String
    $email: String
    $certLevel: String
    $equipment: String
  ) {
    createUser(
      fullName: $fullName
      email: $email
      certLevel: $certLevel
      equipment: $equipment
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;
