import { NavLink } from "react-router-dom";

export default function SidebarNavLink({ icon, title, link }) {
  return (
    <NavLink
      to={link}
      end
      activeClassName="bg-gray-900 bg-opacity-80 highlight-none"
      className="flex items-center w-auto sm:my-2 p-3 rounded-full sm:hover:bg-gray-700 sm:hover:bg-opacity-60 transition-colors duration-300 cursor-pointer"
    >
      <img className="opacity-80 mx-auto md:mx-0" src={icon} alt={title} />
      <span className="font-bold text-xl ml-4 hidden md:block">{title}</span>
    </NavLink>
  );
}
