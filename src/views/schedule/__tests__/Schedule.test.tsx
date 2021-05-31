import { DocumentNode } from "@apollo/client";
import { render } from "../../../testUtils";
import { CREATE_BOOKING, DELETE_BOOKING } from "../mutations";
import { GET_DAY } from "../queries";
import { Schedule } from "../Schedule";

// Test the pipeline works on push
interface IMocks {
  request: {
    query: DocumentNode;
    variables: any;
  };
  result: () => {
    data: any;
  };
}

const mocks: IMocks[] = [
  {
    request: {
      query: GET_DAY,
      variables: {
        name: "Buck",
      },
    },
    result: () => ({
      data: {
        day: {
          teamMembersOff: [],
          noteSet: [],
          tripdetailSet: [
            {
              tripType: "AM_BOAT",
              diveSite1: "Inchcape 1",
              diveSite2: "Inchcape 2",
              diveGuides: [
                {
                  profile: {
                    fullName: "Pierre du Toit",
                    certLevel: "OW",
                  },
                },
              ],
              bookingSet: [
                {
                  id: "38",
                  activity: "PD",
                  equipment: "FK",
                  instructor: null,
                  diver: {
                    profile: {
                      fullName: "Pierre du Toit",
                      certLevel: "OW",
                    },
                  },
                },
                {
                  id: "39",
                  activity: "PD",
                  equipment: "FK",
                  instructor: null,
                  diver: {
                    profile: {
                      fullName: "Hilton Life",
                      certLevel: "AOW",
                    },
                  },
                },
              ],
            },
            {
              tripType: "POOL",
              diveSite1: null,
              diveSite2: null,
              diveGuides: [],
              bookingSet: [
                {
                  id: "40",
                  activity: "OWC",
                  equipment: "FK",
                  instructor: {
                    profile: {
                      fullName: "Edward Gunson",
                      certLevel: "DM",
                    },
                  },
                  diver: {
                    profile: {
                      fullName: "Luke Eee",
                      certLevel: "OW",
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    }),
  },
];

describe("Blank schedule page layout test", () => {
  it("Basic layout of schedule page works", () => {
    const { getByText } = render(<Schedule mocks={mocks} />);
    expect(getByText("9am: Boat Trip")).toBeInTheDocument();
    expect(getByText("1:30pm: Boat Trip")).toBeInTheDocument();
    expect(getByText("Pool Dives")).toBeInTheDocument();
    expect(getByText("Shore Dives")).toBeInTheDocument();
    expect(getByText("Classroom")).toBeInTheDocument();
  });
});

describe("Correct data is shown with actual mock data", () => {
  it("Basic layout of schedule page works", () => {
    const { getByText } = render(<Schedule mocks={mocks} />);
  });
});
