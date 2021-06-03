import { gql } from "@apollo/client";
import {
  bookingFragment,
  profileFragment,
  activityDetailFragment,
} from "./fragments";

const UserFragment = gql`
  ${profileFragment}
  fragment UserFragment on UserType {
    email
    password
    ...ProfileFragment
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

export const BOOKING_QUERY = gql`
  ${activityDetailFragment}
  ${profileFragment}
  query Bookings($date: String!) {
    bookings(date: $date) {
      id
      activityDetail {
        ...ActivityDetailFragment
      }
      activity
      equipment
      time
      instructor {
        ...ProfileFragment
      }
      diver {
        email
        ...ProfileFragment
      }
    }
  }
`;

export const GET_DAY = gql`
  ${profileFragment}
  ${activityDetailFragment}
  ${bookingFragment}
  query GetDay($date: Date!) {
    day(date: $date) {
      __typename
      ... on DayType {
        id
        date
        teamMembersOff {
          ...ProfileFragment
        }
        noteSet {
          title
          text
        }
        activitydetailSet {
          day {
            date
          }
          ...ActivityDetailFragment
          bookingSet {
            ...BookingFragment
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

export const DAILY_ACTIVITY_META = gql`
  query DailyBookingMeta($date: Date!) {
    dailyActivityMeta(date: $date) {
      id
      activityType
    }
  }
`;

export const ACTIVITY_DATA = gql`
  ${bookingFragment}
  ${profileFragment}
  query ActivityData($activityId: ID!) {
    activityData(activityId: $activityId) {
      activityType
      time
      diveSite1
      diveSite2
      diveGuides {
        ...ProfileFragment
      }
      bookingSet {
        ...BookingFragment
      }
    }
  }
`;

export const DAY_QUERY = gql`
  query DayQuery {
    day(date: "2021-03-25") {
      __typename
      ... on DayType {
        date
        teamMembersOff {
          id
        }
        noteSet {
          title
        }
      }
    }
  }
`;
