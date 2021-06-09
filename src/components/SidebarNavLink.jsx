import { NavLink } from "react-router-dom";

export default function SidebarNavLink({ icon, title, link }) {
  return (
    <NavLink
      to={link}
      className="flex items-center w-auto py-3 pl-4 pr-6 my-2 -ml-3 rounded-full hover:bg-gray-700 hover:bg-opacity-60 transition-colors duration-300 cursor-pointer"
    >
      <img className="opacity-80 mr-4" src={icon} alt={title} />
      <span className="font-bold text-xl">{title}</span>
    </NavLink>
  );
}
