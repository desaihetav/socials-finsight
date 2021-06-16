import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "./searchSlice";
import { followUser, unfollowUser } from "../auth/authSlice";

export default function Search() {
  const { users, status } = useSelector((state) => state.search);
  const { user, status: authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(getAllUsers());
    //eslint-disable-next-line
  }, [authStatus]);

  const searchedUsers =
    searchTerm !== ""
      ? users.filter(
          (userItem) =>
            userItem.id !== user.id &&
            (userItem.name.includes(searchTerm) ||
              userItem.username.includes(searchTerm))
        )
      : users.filter((userItem) => userItem.id !== user.id);

  return (
    <>
      {searchedUsers && (
        <div>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search User"
            className="w-full font-medium text-xl bg-gray-700 py-2 px-4 my-4 rounded-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchedUsers?.map(({ image_url, name, username, bio, id }) => {
            let tempInitials = "";
            name?.split(" ").map((word) => (tempInitials += word[0]));
            const initials = tempInitials.slice(0, 2).toUpperCase();
            const isFollowing = user.following.includes(id);
            return (
              <Link key={id} to={`/profile/${id}`}>
                <div className="flex bg-gray-800 p-4 rounded-2xl my-4">
                  <div className="h-14 w-14 rounded-2xl bg-gray-700 flex-shrink-0 flex items-center justify-center">
                    {image_url ? (
                      <img
                        className="h-14 w-14 rounded-2xl"
                        src={image_url}
                        alt={name}
                      />
                    ) : (
                      <span className="font-bold text-2xl">{initials}</span>
                    )}
                  </div>
                  <div className="ml-4 flex flex-col justify-center w-full">
                    <div className="flex w-full items-center">
                      <div className="flex flex-col">
                        <h1 className="font-bold text-xl line-clamp-1">
                          {name}
                        </h1>
                        <h2 className="text-gray-400 line-clamp-1">
                          @{username}
                        </h2>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const variables = {
                            follower_id: user.id,
                            following_id: id,
                          };
                          isFollowing
                            ? dispatch(unfollowUser(variables))
                            : dispatch(followUser(variables));
                        }}
                        className={`ml-auto font-semibold px-3 py-1 border-gray-100 border-2 rounded-xl ${
                          isFollowing && "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                    <p>{bio}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
