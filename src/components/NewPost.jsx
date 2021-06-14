import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNewPostContent, createPost } from "../features/posts/postsSlice";

export default function NewPost({ parent_post, placeholder }) {
  const { newPostContent } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const contentEl = useRef(null);
  const dispatch = useDispatch();

  const names = user?.name?.split(" ");
  const initials = names ? (names[0][0] + names[1][0]).toUpperCase() : "FS";

  return (
    <>
      {user && (
        <div className="p-4 my-4 bg-gray-800 border-2 border-gray-600 rounded-2xl flex flex-col">
          <div className="flex">
            <div className="h-14 w-14 rounded-2xl bg-gray-700 flex items-center justify-center">
              {user?.image_url ? (
                <img
                  className="h-14 w-14 rounded-2xl"
                  src={user?.image_url}
                  alt={user?.name}
                />
              ) : (
                <span className="font-bold text-2xl">{initials}</span>
              )}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h1 className="font-bold text-xl">{user?.name}</h1>
              <h2 className="text-gray-300">@{user?.username}</h2>
            </div>
          </div>
          <textarea
            type="text"
            value={newPostContent}
            placeholder={placeholder}
            ref={contentEl}
            className="mt-4 font-medium bg-transparent py-2 px-1 rounded-xl w-full resize-none"
            style={{
              height: `${contentEl?.current?.scrollHeight}px`,
            }}
            onChange={(e) =>
              dispatch(updateNewPostContent({ content: e.target.value }))
            }
          />
          <button
            onClick={() =>
              dispatch(
                createPost({
                  user_id: user.id,
                  content: newPostContent,
                  parent_post,
                })
              )
            }
            className="py-2 px-4 bg-blue-600 font-semibold rounded-xl ml-auto mt-4"
          >
            Post
          </button>
        </div>
      )}
    </>
  );
}
