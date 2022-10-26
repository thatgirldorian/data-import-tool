import React from "react";
import ReactDOM from "react-dom";
import ExamplePage from "./components/ExamplePage";
import RootComponent from "./components/RootComponent";
import HomePage from "./components/HomePage";
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <RootComponent>
      <HomePage />
    </RootComponent>
  </BrowserRouter>
  ,
  document.querySelector("#root")
);
