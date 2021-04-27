import { gql } from "@apollo/client";
import {
  bookingFragment,
  profileFragment,
  tripDetailFragment,
} from "./fragments";

export const BOOKING_QUERY = gql`
  ${tripDetailFragment}
  ${profileFragment}
  query Bookings($date: String!) {
    bookings(date: $date) {
      id
      tripDetail {
        ...TripDetailFragment
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
  ${tripDetailFragment}
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
        tripdetailSet {
          day {
            date
          }
          ...TripDetailFragment
          bookingSet {
            ...BookingFragment
          }
        }
      }
    }
  }
`;
