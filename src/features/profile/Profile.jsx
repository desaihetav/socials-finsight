import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, resetProfile } from "./profileSlice";
import ProfileHeader from "../../components/ProfileHeader";
import { logoutUser } from "../auth/authSlice";
import { useParams } from "react-router";
import { PostCard } from "../../components";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.profile);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { profileUserId } = useParams();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    // status === "idle" &&
    user?.id !== profileUserId &&
      authStatus === "initComplete" &&
      dispatch(getUserData(profileUserId));

    // return () => dispatch(resetProfile());

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
          {userId === profileUserId && (
            <button
              className="ml-auto bg-red-600 bg-opacity-70 py-2 px-4 mt-4 font-bold rounded-xl"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
          <ProfileHeader />
          {posts && (
            <div className="pt-4 pb-24">
              {posts
                .filter(
                  (post) =>
                    !post.parent_post &&
                    (post.user_id === profileUserId ||
                      post.repost_user_id === profileUserId)
                )
                .map((post, index) => (
                  <PostCard key={`${post.id}-${index}`} post={post} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
