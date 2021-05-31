import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($fullName: String!) {
    searchUsers(fullName: $fullName, first: 6) {
      edges {
        node {
          id
          profile {
            fullName
            certLevel
            equipment
          }
        }
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
