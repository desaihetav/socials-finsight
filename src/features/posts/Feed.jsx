import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components";

export default function Feed() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="pt-4 pb-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
