import { useDispatch, useSelector } from "react-redux";
import {
  likePostById,
  savePostById,
  unlikePostById,
  unsavePostById,
  repostPostById,
  unrepostPostById,
} from "../features/posts/postsSlice";

export default function PostCard({ post }) {
  const {
    id: postId,
    user: { image_url, name, username },
    content,
    likes_aggregate: {
      aggregate: { count: likeCount },
    },
    saves_aggregate: {
      aggregate: { count: saveCount },
    },
    reposts_aggregate: {
      aggregate: { count: repostCount },
    },
    likes,
    saves,
    reposts,
  } = post;

  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isPostLiked = likes.length;
  const isPostSaved = saves.length;
  const isPostReposted = reposts.length;

  const names = name?.split(" ");
  const initials = names ? (names[0][0] + names[1][0]).toUpperCase() : "FS";

  console.log(reposts);

  return (
    <div className="bg-gray-800 p-4 pb-2 mb-4 rounded-2xl">
      {post.repost_user_name && (
        <div className="flex items-center mb-2 opacity-70">
          <img className="h-4 w-4 mr-2" src="/icons/repost.svg" alt="repost" />
          <p className="font-bold">
            <span>
              {post.repost_user_id === userId ? "You" : post.repost_user_name}
            </span>{" "}
            Reposted
          </p>
        </div>
      )}
      <div className="flex">
        <div className="h-14 w-14 rounded-2xl bg-gray-700 flex items-center justify-center">
          {image_url ? (
            <img className="h-14 w-14 rounded-2xl" src={image_url} alt={name} />
          ) : (
            <span className="font-bold text-2xl">{initials}</span>
          )}
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h1 className="font-bold text-xl">{name}</h1>
          <h2 className="text-gray-300">@{username}</h2>
        </div>
      </div>
      <p className="mt-4 my-2 font-medium whitespace-pre-wrap">{content}</p>
      <div className="flex items-center justify-around opacity-70">
        <button className="flex items-center py-2 px-4">
          <img
            className="mr-2 h-4 w-4"
            src={`/icons/comment.svg`}
            alt="comments"
          />
          <span className={`font-semibold`}>{likeCount}</span>
        </button>
        <button
          onClick={() => {
            console.log("dispatcing with: ", userId, postId);
            isPostReposted
              ? dispatch(unrepostPostById({ user_id: userId, post_id: postId }))
              : dispatch(
                  repostPostById({
                    user_id: userId,
                    post_id: postId,
                    sender_id: userId,
                    receiver_id: post.user_id,
                    type: "repost",
                    link: `/post/${postId}`,
                  })
                );
          }}
          className="flex items-center py-2 px-4"
        >
          <img
            className="mr-2 h-4 w-4"
            src={`/icons/${isPostReposted ? "repost-green" : "repost"}.svg`}
            alt="share"
          />
          <span
            className={`${isPostReposted && "text-green-400"} font-semibold`}
          >
            {repostCount}
          </span>
        </button>
        <button
          onClick={() => {
            console.log("dispatcing with: ", userId, postId);
            isPostLiked
              ? dispatch(unlikePostById({ user_id: userId, post_id: postId }))
              : dispatch(
                  likePostById({
                    user_id: userId,
                    post_id: postId,
                    sender_id: userId,
                    receiver_id: post.user_id,
                    type: "like",
                    link: `/post/${postId}`,
                  })
                );
          }}
          className="flex items-center py-2 px-4"
        >
          <img
            className="mr-2 h-4 w-4"
            src={`/icons/${isPostLiked ? "heart-red" : "heart"}.svg`}
            alt="like"
          />
          <span className={`${isPostLiked && "text-red-600"} font-semibold`}>
            {likeCount}
          </span>
        </button>
        <button
          onClick={() => {
            console.log("dispatcing with: ", userId, postId);
            isPostSaved
              ? dispatch(unsavePostById({ user_id: userId, post_id: postId }))
              : dispatch(
                  savePostById({
                    user_id: userId,
                    post_id: postId,
                    sender_id: userId,
                    receiver_id: post.user_id,
                    type: "save",
                    link: `/post/${postId}`,
                  })
                );
          }}
          className="flex items-center py-2 px-4"
        >
          <img
            className="mr-2 h-4 w-4"
            src={`/icons/${isPostSaved ? "bookmark-yellow" : "bookmark"}.svg`}
            alt="bookmark"
          />
          <span className={`${isPostSaved && "text-yellow-400"} font-semibold`}>
            {saveCount}
          </span>
        </button>
      </div>
    </div>
  );
}
