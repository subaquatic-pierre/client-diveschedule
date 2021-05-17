import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ScheduleTableEditRow } from "../ScheduleTableEditRow";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableEditRow />
      </MockedProvider>
    );
  });
});
