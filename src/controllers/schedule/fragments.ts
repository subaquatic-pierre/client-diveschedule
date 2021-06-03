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
    diverRole
    equipment
    time
    activityDetail {
      activityType
    }
    instructor {
      ...ProfileFragment
    }
    diver {
      ...ProfileFragment
    }
  }
`;

export const activityDetailFragment = gql`
  fragment ActivityDetailFragment on TripDetailType {
    id
    activityType
    time
    diveSite1
    diveSite2
    diveGuides {
      id
      ...ProfileFragment
    }
  }
`;
