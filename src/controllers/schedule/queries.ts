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
      activityDetail {
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
        activitydetailSet {
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

// export const GET_DAILY_ACTIVITY_META = gql`
//   query GetDailyActivityMeta($date: Date!) {
//     dailyActivityMeta(date: $date) {
//       activity {
//         id
//         activityType
//       }
//     }
//   }
// `;
