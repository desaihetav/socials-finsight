import { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth } from "../../context/AuthProvider";

export function PrivateRoute({ element, ...props }) {
  const { isAuthenticated } = useAuth0();
  const [firstCheckComplete, setFirstCheckComplete] = useState(false);

  return (
    <Route {...props}>
      <h1>Herer</h1>
      {withAuthenticationRequired(element, {
        onRedirecting: () => <h1>Loading...</h1>,
      })}
    </Route>
  );

  // const { userToken } = useAuth();
  // const userToken = localStorage?.getItem("authUserToken");

  // console.log({ userToken });

  // return userToken ? (
  //   <Route {...props} path={path} />
  // ) : (
  //   <Navigate state={{ from: path }} replace to="/login" />
  // );
}
