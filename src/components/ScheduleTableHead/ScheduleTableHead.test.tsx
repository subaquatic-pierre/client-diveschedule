import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ScheduleTableHead } from ".";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableHead
          onSelectAllClick={{} as any}
          numSelected={{} as any}
          rowCount={{} as any}
          headFields={{} as any}
        />
      </MockedProvider>
    );
  });
});
