import { gql } from "@apollo/client";
import { userFragment } from "../user";

export const bookingFragment = gql`
  ${userFragment}
  fragment BookingFragment on BookingType {
    id
    diverRole
    equipment
    time
    activityDetail {
      activityType
      id
    }
    instructor {
      ...UserFragment
    }
    diver {
      ...UserFragment
    }
  }
`;

export const activityDetailFragment = gql`
  ${userFragment}
  fragment ActivityDetailFragment on ActivityDetailType {
    id
    activityType
    time
    diveSite1
    diveSite2
    diveGuides {
      ...UserFragment
    }
  }
`;
