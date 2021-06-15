import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SidebarFooter() {
  const { user } = useSelector((state) => state.auth);
  const { image_url, name, username } = user ? user : {};
  const names = name?.split(" ");
  const initials = names ? (names[0][0] + names[1][0]).toUpperCase() : "FS";
  return (
    <div className="hover-hover:bg-gray-700 hover-hover:bg-opacity-40 w-full rounded-b-2xl p-4 border-t border-gray-700 transition-colors duration-300 cursor-pointer hidden sm:flex">
      <NavLink className="w-full" to={`/profile/${user?.id}`}>
        {user && (
          <div className="flex w-full">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-gray-700 flex items-center justify-center">
              {image_url ? (
                <img
                  className="h-14 w-14 rounded-2xl"
                  src={image_url}
                  alt={name}
                />
              ) : (
                <span className="font-bold text-2xl">{initials}</span>
              )}
            </div>
            <div className="hidden md:flex items-center flex-grow">
              <div className="ml-4 flex flex-col justify-center">
                <h1 className="font-bold text-xl">{name}</h1>
                <h2 className="text-gray-300">@{username}</h2>
              </div>
              <img
                className="ml-auto opacity-50"
                src="/icons/settings.svg"
                alt=""
              />
            </div>
          </div>
        )}
      </NavLink>
    </div>
  );
}
