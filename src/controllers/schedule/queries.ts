import { gql } from "@apollo/client";
import {
  bookingFragment,
  profileFragment,
  activityDetailFragment,
} from "./fragments";

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

// export const CREATE_BOOKING = gql`
//     mutation CreateBooking(){
//         booking {
//         id
//         activity
//         activityType
//         equipment
//         diver {
//           email
//           profile {
//             fullName
//             certLevel
//           }
//         }
//       }
//     }
// `;

// export const EDIT_BOOKING = gql`
//   mutation EditBooking($id: ID!) {
//     editBooking(id: $ID) {
//       booking {
//         id
//         activity
//         activityType
//         equipment
//         diver {
//           email
//           profile {
//             fullName
//             certLevel
//           }
//         }
//       }
//     }
//   }
// `;

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

export const ACTIVITY_BOOKINGS = gql`
  ${bookingFragment}
  ${profileFragment}
  query ActivityBookings($activityId: ID!) {
    activityBookings(activityId: $activityId) {
      ...BookingFragment
    }
  }
`;
