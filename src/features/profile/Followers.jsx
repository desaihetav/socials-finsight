import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./profileSlice";
import { followUser, unfollowUser } from "../auth/authSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Followers() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const { profileUserId } = useParams();

  useEffect(() => {
    // status === "idle" &&
    user.id !== profileUserId &&
      authStatus === "initComplete" &&
      dispatch(getUserData(profileUserId));
    //eslint-disable-next-line
  }, [authStatus]);

  return (
    <>
      {user && (
        <div>
          <p className="font-bold text-2xl my-4">{user.name}'s Followers</p>
          {user?.followers?.map(
            ({ followers: { id, image_url, name, username, bio } }) => {
              let tempInitials = "";
              name?.split(" ").map((word) => (tempInitials += word[0]));
              const initials = tempInitials.slice(0, 2).toUpperCase();
              const isFollowing = user.following_user_ids?.includes(id);
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
                              follower_id: userId,
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
            }
          )}
        </div>
      )}
    </>
  );
}
