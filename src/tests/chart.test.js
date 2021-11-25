import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Chart from "../components/chart";


let container = null;
const data = [
    {
        "time": 40,
        "type": "Misses",
        "value": 105,
        "grade": 70
    },
    {
        "time": 100,
        "type": "Misses",
        "value": 50,
        "grade": 100
    },
    {
        "time": 160,
        "type": "Headshot",
        "value": true,
        "grade": 100
    },
    {
        "time": 280,
        "type": "Misses",
        "value": 55,
        "grade": 100
    },
    {
        "time": 600,
        "type": "Misses",
        "value": 110,
        "grade": 70
    },
    {
        "time": 900,
        "type": "Misses",
        "value": 88,
        "grade": 70
    },
    {
        "time": 1260,
        "type": "Body",
        "value": true,
        "grade": 80
    },
    {
        "time": 10500,
        "type": "Misses",
        "value": 222,
        "grade": 70
    },
    {
        "time": 10600,
        "type": "Misses",
        "value": 99,
        "grade": 70
    },
    {
        "time": 12600,
        "type": "Body",
        "value": true,
        "grade": 80
    },
    {
        "time": 16780,
        "type": "Misses",
        "value": 50,
        "grade": 100
    },
    {
        "time": 21000,
        "type": "Body",
        "value": true,
        "grade": 80
    },
    {
        "time": 27000,
        "type": "Misses",
        "value": 8,
        "grade": 100
    },
    {
        "time": 27060,
        "type": "Misses",
        "value": 510,
        "grade": 0
    },
    {
        "time": 27900,
        "type": "Misses",
        "value": 99,
        "grade": 70
    },
    {
        "time": 27980,
        "type": "Body",
        "value": true,
        "grade": 80
    },
    {
        "time": 28500,
        "type": "Headshot",
        "value": true,
        "grade": 100
    }
];
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

it("renders graph with yLabel and xLabel", () => {
  act(() => {
    render(<Chart data={data} width={800} height={400}/>, container);
  });

  expect(container.textContent).toContain("Time {Ms}");
  expect(container.textContent).toContain("Grade");
});

it("renders exactly 22 values on x axis and u axis labels", () => {
    act(() => {
      render(<Chart data={data} width={800} height={400}/>, container);
    });

    let time_points = container.querySelectorAll('.recharts-cartesian-axis-tick-value');
    expect(time_points.length).toBe(22);
});