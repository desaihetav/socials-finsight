import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter, Login, Profile } from "./features";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { useAuth } from "./context/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import "./App.css";

const createApolloClient = (token) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://social-finsight.hasura.app/v1/graphql",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const { userToken } = useAuth();
  const client = createApolloClient(userToken);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
