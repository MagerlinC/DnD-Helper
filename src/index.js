import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Firebase, { FirebaseContext } from "./Firebase";
import App from "./App/index";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById("root")
);

registerServiceWorker();
