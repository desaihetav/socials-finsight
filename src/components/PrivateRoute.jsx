import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ path, ...props }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
