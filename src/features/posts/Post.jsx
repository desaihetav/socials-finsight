import { current } from "immer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard, PostItemCard } from "../../components";
import NewPost from "../../components/NewPost";

export default function Post() {
  const { postId } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const currentPost = posts.find((post) => post.id === postId);
  return (
    <div className="mb-28">
      {currentPost && (
        <div>
          <PostItemCard post={currentPost} />
          <NewPost parent_post={currentPost.id} placeholder="Post your reply" />
          <div className="flex items-center">
            <div className="h-px bg-gray-600 flex-grow" />
            <p className="font-bold text-xl mx-4 text-center">Replies</p>
            <div className="h-px bg-gray-600 flex-grow" />
          </div>
          <div className="my-4">
            {posts
              .filter((post) => post.parent_post === postId)
              .map((post) => (
                <PostCard post={post} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
