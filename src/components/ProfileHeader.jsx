import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

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

  const editButtonHandler = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="bg-gray-800 bg-opacity-75 p-6 mt-4 rounded-2xl">
      <div className="flex">
        <div className="h-16 w-16 rounded-3xl bg-gray-700 flex items-center justify-center">
          {image_url ? (
            <img className="h-16 w-16 rounded-3xl" src={image_url} alt={name} />
          ) : (
            <span className="font-bold text-2xl">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h1 className="font-bold text-xl">{name}</h1>
          <h2 className="text-gray-300">@{username}</h2>
        </div>
        <button
          onClick={editButtonHandler}
          className="ml-auto my-auto px-4 py-2 rounded-xl bg-gray-700"
        >
          Edit
        </button>
      </div>
      {bio && <p className="mt-4 font-semibold">{bio}</p>}
      {website_url && (
        <div className="mt-4 flex items-center opacity-80">
          <img className="h-4 w-4 mr-2" src="/icons/link.svg" alt="link" />
          <p className="">{website_url}</p>
        </div>
      )}
      {location && (
        <div className="mt-4 flex items-center opacity-80">
          <img
            className="h-4 w-4 mr-2"
            src="/icons/location.svg"
            alt="location"
          />
          <p className="">{location}</p>
        </div>
      )}
      <div className="mt-4 flex items-center opacity-80">
        <span className="mr-2">{following}</span>
        <p className="mr-4">Following</p>
        <span className="mr-2">{followers}</span>
        <p className="mr-4">Followers</p>
      </div>
    </div>
  );
}
