import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProfileHeader() {
  const { user, status } = useSelector((state) => state.profile);
  const { userId, status: authStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { profileUserId } = useParams();

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

  const names = name?.split(" ");
  const initials = names ? (names[0][0] + names[1][0]).toUpperCase() : "FS";

  const editButtonHandler = () => {
    navigate("/profile/edit");
  };

  return (
    <>
      {user && (
        <div className="bg-gray-800 border-2 border-gray-600 p-6 mt-4 rounded-2xl">
          <div className="flex">
            <div className="h-14 w-14 rounded-2xl bg-gray-700 flex-shrink-0 flex items-center justify-center">
              {image_url ? (
                <img
                  className="h-14 w-14 rounded-2xl"
                  src={image_url}
                  alt={name}
                />
              ) : (
                <span className="font-bold text-2xl">
                  {/* {name.slice(0, 2).toUpperCase()} */}
                  {initials}
                </span>
              )}
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h1 className="font-bold text-xl">{name}</h1>
              <h2 className="text-gray-300">@{username}</h2>
            </div>
            {userId === profileUserId && (
              <button
                onClick={editButtonHandler}
                className="ml-auto my-auto px-4 py-2 rounded-xl bg-gray-700"
              >
                Edit
              </button>
            )}
          </div>
          {bio && <p className="mt-4 font-semibold">{bio}</p>}
          <div className="text-gray-300">
            {website_url && (
              <div className="mt-4 flex items-center">
                <img
                  className="h-4 w-4 mr-2"
                  src="/icons/link.svg"
                  alt="link"
                />
                <a
                  href={website_url}
                  rel="noreferrer"
                  target="_blank"
                  className=""
                >
                  {website_url}
                </a>
              </div>
            )}
            {location && (
              <div className="mt-4 flex items-center">
                <img
                  className="h-4 w-4 mr-2"
                  src="/icons/location.svg"
                  alt="location"
                />
                <p className="">{location}</p>
              </div>
            )}
            <div className="mt-4 flex items-center text-gray-50 font-semibold">
              <Link to="following">
                <div className="flex">
                  <span className="mr-2">{following.length}</span>
                  <p className="mr-4">Following</p>
                </div>
              </Link>
              <Link to="followers">
                <div className="flex">
                  <span className="mr-2">{followers.length}</span>
                  <p className="mr-4">Followers</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
