import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  render(ui, {
    wrapper: ({ children }: any) => {
      const props = children?.props;
      return <MockedProvider mocks={props.mocks}>{children}</MockedProvider>;
    },
    ...options,
  });

export * from "@testing-library/react";

export { customRender as render };
