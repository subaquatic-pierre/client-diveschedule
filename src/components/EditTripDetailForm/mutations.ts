import { gql } from "@apollo/client";

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
