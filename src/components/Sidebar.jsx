import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { SidebarFooter, SidebarNavLink } from ".";

export default function Sidebar() {
  const { status, userId, userToken } = useSelector((state) => state.auth);

  return (
    <div className="sm:h-screen py-4 mx-4 sm:mx-0 bg-gradient-to-t from-gray-900 to-transparent">
      <div className="h-full flex flex-col items-center md:items-start rounded-2xl bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div className="w-full h-full p-4 flex sm:flex-col justify-around sm:justify-start">
          <NavLink className="hidden sm:block" to="/">
            <img
              className="mb-6 mx-auto"
              src="/icons/finsight.svg"
              alt="finsight logo"
            />
          </NavLink>

          <SidebarNavLink icon="/icons/home.svg" title="Home" link="/" />
          <SidebarNavLink
            icon="/icons/search.svg"
            title="Search"
            link="/search"
          />
          <SidebarNavLink
            icon="/icons/bell.svg"
            title="Notifications"
            link="/notifications"
          />
          <SidebarNavLink
            icon="/icons/user.svg"
            title="Profile"
            link={`/profile/${userId}`}
          />
        </div>
        <SidebarFooter />
      </div>
    </div>
  );
}
