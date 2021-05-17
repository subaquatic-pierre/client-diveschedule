import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ScheduleTableAddButton } from "../ScheduleTableAddButton";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableAddButton showCreateBookingRow={() => jest.fn() as any} />
      </MockedProvider>
    );
  });
});
