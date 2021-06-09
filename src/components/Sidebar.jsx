import { SidebarFooter, SidebarNavLink } from ".";

export default function Sidebar() {
  return (
    <div className="h-screen py-4 w-1/3 mr-6">
      <div className="h-full w-full flex flex-col rounded-2xl bg-gray-800 bg-opacity-75">
        <div className="p-6">
          <p className="font-extrabold text-3xl mb-6">Finsight</p>
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
            link="/profile"
          />
        </div>
        <SidebarFooter />
      </div>
    </div>
  );
}
