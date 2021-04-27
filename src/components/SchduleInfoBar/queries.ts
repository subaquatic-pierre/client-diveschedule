import { gql } from "@apollo/client";

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
