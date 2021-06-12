import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./searchSlice";

export default function Search() {
  const { users, status } = useSelector((state) => state.search);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(getAllUsers()) &&
      console.log("dispatched");
    //eslint-disable-next-line
  }, [authStatus]);

  return (
    <div>
      {users?.map(({ image_url, name, username, bio }) => {
        const names = name?.split(" ");
        const initials = names
          ? (names[0][0] + names[1][0]).toUpperCase()
          : "FS";
        return (
          <div className="flex bg-gray-800 p-4 rounded-2xl my-4">
            <div className="h-14 w-14 rounded-2xl bg-gray-700 flex-shrink-0 flex items-center justify-center">
              {image_url ? (
                <img
                  className="h-14 w-14 rounded-2xl"
                  src={image_url}
                  alt={name}
                />
              ) : (
                <span className="font-bold text-2xl">
                  {/* {name.slice(0, 2).toUpperCase()} */}
                  {initials}
                </span>
              )}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h1 className="font-bold text-xl">{name}</h1>
              <h2 className="text-gray-400">@{username}</h2>
              <p>{bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
