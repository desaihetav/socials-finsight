import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { loadAllPosts } from "./postsSlice";

export default function Feed() {
  const { posts, status, error } = useSelector((state) => state.posts);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(loadAllPosts(userId));
  }, [authStatus]);

  // let sortedPosts = [...posts];

  // sortedPosts.sort((a, b) =>
  //   new Date(b.created) > new Date(a.created) ? 1 : -1
  // );

  return (
    <div className="pt-4 pb-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
