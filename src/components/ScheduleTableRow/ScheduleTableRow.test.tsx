import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ScheduleTableRow } from ".";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableRow
          handleSelectClick={{} as any}
          setEditingBookingId={{} as any}
          selected={{} as any}
          bookingData={{} as any}
        />
      </MockedProvider>
    );
  });
});
