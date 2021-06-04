import { gql } from "@apollo/client";
import { bookingFragment, activityDetailFragment } from "./fragments";
import { profileFragment } from "../user";

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

export const EDIT_ACTIVITY_DETAIL = gql`
  mutation EditActivityDetail(
    $id: ID!
    $diveSite1: String
    $diveSite2: String
    $diveGuides: [ID]
  ) {
    editActivityDetail(
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

export const CREATE_ACTIVITY_DETAIL = gql`
  mutation CreateActivityDetail(
    $diveSite1: String
    $diveSite2: String
    $diveGuides: [ID]
    $date: Date
    $time: String
    $activityType: String
  ) {
    createActivityDetail(
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
        profile {
          ...ProfileFragment
        }
      }
      diver {
        email
        profile {
          ...ProfileFragment
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
      id
      day {
        date
      }
      activityType
      time
      diveSite1
      diveSite2
      diveGuides {
        profile {
          ...ProfileFragment
        }
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
