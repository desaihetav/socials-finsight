import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { loadAllPosts } from "./postsSlice";

export default function Home() {
  const { posts, status, error } = useSelector((state) => state.posts);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(loadAllPosts(userId));
  }, [authStatus]);
  return (
    <div className="py-4">
      <div>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
}
