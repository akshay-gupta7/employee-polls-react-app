import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import middleware from "../middleware";
import reducers from "../reducers";
import DisplayErrorPage from "../components/DisplayErrorPage";

const store = legacy_createStore(reducers, middleware);

describe("Display Error 404 page", () => {
    let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Router>
          <DisplayErrorPage />
        </Router>
      </Provider>
    );
  })

  it("matches the snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});