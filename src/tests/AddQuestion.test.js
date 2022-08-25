import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducers from "../reducers";
import AddQuestion from "../components/AddQuestion"

const store = legacy_createStore(reducers, middleware);

describe("Add New QUestion", () => {
  let component;
  let submitButton;
  let inputOptionOne;
  let inputOptionTwo;
  

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Router>
          <AddQuestion />
        </Router>
      </Provider>
    );

    submitButton = component.getByTestId("submit-button");
    inputOptionOne = component.getByTestId("option-one-input");
    inputOptionTwo = component.getByTestId("option-two-input");
    
  })

  it("matches the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("will enable the submit button when adding a new question with two options", async () => {
    fireEvent.change(inputOptionOne, { target: { value: "option one test" } });
    fireEvent.change(inputOptionTwo, { target: { value: "option two test" } });

    expect(submitButton).toBeEnabled();
  });

  it('will disable the submit button when trying to add a new question without both options being filled', () => {
    fireEvent.change(inputOptionOne, { target: { value: "option one test" } });
    fireEvent.change(inputOptionTwo, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });
});