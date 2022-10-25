import React from "react";
import ReactDOM from "react-dom";
import ExamplePage from "./ExamplePage";
import RootComponent from "./RootComponent";

ReactDOM.render(
  <RootComponent>
    <ExamplePage />
  </RootComponent>,
  document.querySelector("#root")
);
