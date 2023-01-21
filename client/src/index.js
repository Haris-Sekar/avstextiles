import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);