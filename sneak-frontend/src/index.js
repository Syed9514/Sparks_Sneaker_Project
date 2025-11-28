import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
// import "./theme.css";
import { Provider } from "react-redux";
import store from "./app/store";
// import IconTest from "./IconTest.jsx";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <IconTest/> */}
  </React.StrictMode>,
  document.getElementById("root")
);
