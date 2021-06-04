import { gql } from "@apollo/client";
import { profileFragment } from "../user";

export const bookingFragment = gql`
  ${profileFragment}
  fragment BookingFragment on BookingType {
    id
    diverRole
    equipment
    time
    activityDetail {
      activityType
    }
    instructor {
      profile {
        ...ProfileFragment
      }
    }
    diver {
      profile {
        ...ProfileFragment
      }
    }
  }
`;

export const activityDetailFragment = gql`
  ${profileFragment}
  fragment ActivityDetailFragment on ActivityDetailType {
    id
    activityType
    time
    diveSite1
    diveSite2
    diveGuides {
      id
      profile {
        ...ProfileFragment
      }
    }
  }
`;
