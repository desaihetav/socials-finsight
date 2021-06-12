import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData, updateUserField } from "./profileSlice";
import { createBrowserHistory } from "history";

export default function EditProfile() {
  const { status, user } = useSelector((state) => state.profile);
  const { status: authStatus, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const {
    name,
    image_url,
    username,
    bio,
    website_url,
    location,
    followers,
    following,
  } = user;

  useEffect(() => {
    status === "idle" &&
      authStatus === "initComplete" &&
      dispatch(getUserData(userId));
    //eslint-disable-next-line
  }, [authStatus]);

  const updateFieldHandler = (key, value) => {
    console.log(key, value);
    dispatch(
      updateUserField({
        key,
        value,
      })
    );
  };

  return (
    <>
      {/* {status === "loading" && <h1>Loading...</h1>}
      {status === "error" && <h1>Error...</h1>} */}
      {console.log(user)}
      {!user && <h1>Loading...</h1>}
      {user && (
        <div className="bg-gray-800 p-6 mt-4 rounded-2xl">
          <div className="flex items-center w-full">
            <div className="h-16 w-16 rounded-3xl bg-gray-700 flex items-center justify-center">
              {image_url ? (
                <img
                  className="h-16 w-16 rounded-3xl"
                  src={image_url}
                  alt={name}
                />
              ) : (
                <span className="font-bold text-2xl">
                  {name?.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="ml-4 flex flex-col flex-grow justify-center overflow-hidden">
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="font-bold text-xl bg-gray-700 py-2 px-3 mb-2 rounded-xl"
                onChange={(e) => updateFieldHandler("name", e.target.value)}
              />
              <span className="text-gray-300">@{username}</span>
            </div>
          </div>
          <textarea
            type="text"
            value={bio}
            placeholder="Bio"
            className="mt-4 font-semibold bg-gray-700 py-2 px-3 rounded-xl w-full"
            resize="vertical"
            onChange={(e) => updateFieldHandler("bio", e.target.value)}
          />
          <div className="mt-4 flex items-center opacity-80">
            <img className="h-4 w-4 mr-2" src="/icons/link.svg" alt="link" />
            <input
              type="url"
              value={website_url}
              placeholder="Link (with https://)"
              className="bg-gray-700 py-2 px-3 rounded-xl w-full"
              onChange={(e) =>
                updateFieldHandler("website_url", e.target.value)
              }
            />
          </div>
          <div className="mt-4 flex items-center opacity-80">
            <img
              className="h-4 w-4 mr-2"
              src="/icons/location.svg"
              alt="location"
            />
            <input
              type="text"
              value={location}
              placeholder="Location"
              className="bg-gray-700 py-2 px-3 rounded-xl w-full"
              onChange={(e) => updateFieldHandler("location", e.target.value)}
            />
          </div>
          <div className="my-4 flex items-center opacity-80">
            <span className="mr-2">{following}</span>
            <p className="mr-4">Following</p>
            <span className="mr-2">{following}</span>
            <p className="mr-4">Followers</p>
          </div>
          <button
            onClick={() => {
              dispatch(updateUserData(user));
              history.back();
            }}
            className="w-full px-4 py-2 rounded-xl bg-blue-700"
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}
