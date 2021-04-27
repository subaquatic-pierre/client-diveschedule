import { ScheduleInfoBar } from ".";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleInfoBar
          selectedDate={() => jest.fn()}
          setSelectedDate={() => jest.fn()}
          editDiverModalOpen={false}
          handleOpenEditDiverModal={() => jest.fn()}
        />
      </MockedProvider>
    );
  });
});
