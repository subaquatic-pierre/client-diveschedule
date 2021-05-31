import { gql } from "@apollo/client";

export const profileFragment = gql`
  fragment ProfileFragment on UserType {
    profile {
      fullName
      certLevel
    }
  }
`;

export const bookingFragment = gql`
  fragment BookingFragment on BookingType {
    id
    activity
    equipment
    time
    tripDetail {
      tripType
    }
    instructor {
      ...ProfileFragment
    }
    diver {
      ...ProfileFragment
    }
  }
`;

export const tripDetailFragment = gql`
  fragment TripDetailFragment on TripDetailType {
    id
    tripType
    time
    diveSite1
    diveSite2
    diveGuides {
      id
      ...ProfileFragment
    }
  }
`;
