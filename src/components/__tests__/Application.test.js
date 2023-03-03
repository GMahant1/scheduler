import React from "react";
import axios from "axios";
import { 
  render, 
  cleanup, 
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  prettyDOM,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText, } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    console.log(prettyDOM(container));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    
  });
});
