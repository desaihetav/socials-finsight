import { useSelector } from "react-redux";
import { PostCard } from "../../components";

export default function Feed() {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  console.log(user);

  const feedPosts = posts?.filter(
    (post) => !post.parent_post && user?.following?.includes(post.user_id)
  );

  return (
    <div className="pt-4 pb-20">
      {posts.length !== 0 && feedPosts.length === 0 && (
        <p className="font-semibold text-xl text-center w-full my-6">
          No posts to display
        </p>
      )}
      {user &&
        feedPosts &&
        feedPosts.map((post, index) => (
          <PostCard key={`${post.id}-${index}`} post={post} />
        ))}
    </div>
  );
}
