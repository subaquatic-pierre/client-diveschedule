import { ScheduleTableGuideRow } from ".";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

describe("Autocomplete search tests", () => {
  it("renders without error", () => {
    const { getByText } = render(
      <MockedProvider>
        <ScheduleTableGuideRow profile={{} as any} />
      </MockedProvider>
    );
  });
});
