import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ScheduleTable } from "../table/ScheduleTable";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTable
          diveTripDetail={{} as any}
          loading={false}
          date={{} as any}
          tableType=""
          handleOpenEditDiverModal={() => jest.fn()}
        />
      </MockedProvider>
    );
  });
});
