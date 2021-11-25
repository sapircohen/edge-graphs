import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Score from "../components/common/score";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders score and title", () => {
  act(() => {
    render(<Score title="Accuracy score" score={75}/>, container);
  });
  expect(container.textContent).toBe("Accuracy score : 75");
});