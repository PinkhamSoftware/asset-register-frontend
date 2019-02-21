import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import { init } from "@sentry/browser";
import 'govuk-frontend/all.js'
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.REACT_APP_SENTRY_DSN) {
  init({
    dsn: process.env.REACT_APP_SENTRY_DSN
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
