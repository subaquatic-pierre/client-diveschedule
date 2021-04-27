import { ScheduleTable } from ".";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTable
          diveTripDetail={{} as any}
          loading={false}
          date={{} as any}
          tableType={""}
          handleOpenEditDiverModal={() => jest.fn()}
        />
      </MockedProvider>
    );
  });
});
