import { useDispatch, useSelector } from "react-redux";
import { likePostById, unlikePostById } from "../features/posts/postsSlice";

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
    likes,
    saves,
  } = post;

  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isPostLiked = likes.length;
  const isPostSaved = saves.length;

  const names = name?.split(" ");
  const initials = names ? (names[0][0] + names[1][0]).toUpperCase() : "FS";

  console.log({ likes });

  return (
    <div className="bg-gray-800 p-4 pb-2 rounded-2xl">
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
      <p className="text-base mt-4 my-2 font-medium">{content}</p>
      <div className="flex items-center justify-around opacity-70">
        <button className="flex items-center py-2 px-4">
          <img
            className="mr-2 h-4 w-4"
            src={`/icons/comment.svg`}
            alt="comments"
          />
          <span className={`font-semibold`}>{likeCount}</span>
        </button>
        <button className="flex items-center py-2 px-4">
          <img className="mr-2 h-4 w-4" src="/icons/share.svg" alt="share" />
        </button>
        <button
          onClick={() => {
            console.log("dispatcing with: ", userId, postId);
            isPostLiked
              ? dispatch(unlikePostById({ user_id: userId, post_id: postId }))
              : dispatch(likePostById({ user_id: userId, post_id: postId }));
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
        <button className="flex items-center py-2 px-4">
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
      <p>{likes.length}</p>
    </div>
  );
}
