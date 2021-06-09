import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./profileSlice";
import ProfileHeader from "../../components/ProfileHeader";
import { logoutUser } from "../auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  const { userId, status: authStatus } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(getUserData(userId));
    //eslint-disable-next-line
  }, [authStatus]);

  return (
    <div>
      {(status === "loading" || authStatus !== "initComplete") && (
        <h1>Loading...</h1>
      )}
      {status === "error" && <h1>Error...</h1>}
      {status === "fulfilled" && user && (
        <div className="mx-auto flex flex-col">
          <ProfileHeader />
          <button
            className="mx-auto bg-red-600 py-2 px-4 mt-4 font-bold rounded-xl"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
