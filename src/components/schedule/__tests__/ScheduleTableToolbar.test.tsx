import { ScheduleTableToolbar } from "../ScheduleTableToolbar";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableToolbar
          numSelected={{} as any}
          tableType={{} as any}
          showAddBooking={{} as any}
          showCreateBookingRow={{} as any}
          deleteBooking={{} as any}
        />
      </MockedProvider>
    );
  });
});
