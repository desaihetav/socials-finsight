import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const onRedirectCallback = (appState) => {
  console.log({ appState });
  window.history.replaceState(
    {},
    document.title,
    appState.returnTo
    // appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

console.log(window.location.origin);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain="finsight.jp.auth0.com"
        clientId="OIEl7dBRV2iOWVbK1iUpLdeJUZM4Rcen"
        redirectUri={window.location.href}
        audience="https://social-finsight.com/"
        onRedirectCallback={onRedirectCallback}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </Auth0Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
