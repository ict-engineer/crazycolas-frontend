import React from "react";
import ReactDOM from "react-dom";
import "assets/style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import MagicWeb3Provider from "./utils/hocs/MagicWeb3Provider";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MagicWeb3Provider>
      <App />
    </MagicWeb3Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
