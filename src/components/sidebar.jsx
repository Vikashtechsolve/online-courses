import {
  LuLayoutDashboard,
  LuBookOpen,
  LuVideo,
  LuFileText,
  LuAward,
  LuMegaphone,
  LuCircleHelp,
  LuUser,
  LuLogOut,
} from "react-icons/lu";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: LuLayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "My Courses",
      icon: LuBookOpen,
      path: "/mycourses",
    },
    {
      name: "Live Sessions",
      icon: LuVideo,
      path: "/livesessions",
    },
    {
      name: "Assignments",
      icon: LuFileText,
      path: "/assignments",
    },
    {
      name: "Certificates",
      icon: LuAward,
      path: "/certificates",
    },
    {
      name: "Announcements",
      icon: LuMegaphone,
      path: "/announcements",
    },
    {
      name: "Support/Help",
      icon: LuCircleHelp,
      path: "/support",
    },
    {
      name: "Profile",
      icon: LuUser,
      path: "/profile",
    },
    {
      name: "Logout",
      icon: LuLogOut,
      path: "/logout",
    },
  ];

  return (
    <div className="w-[240px] bg-white border-r border-gray-200 h-screen">

      {/* Logo */}
      <div className="p-6 font-bold text-xl">
        <span className="text-black">V</span>
        <span className="text-red-600">T</span>
        <span className="text-black">S</span>
      </div>

      {/* Menu */}
      <div className="space-y-2 px-3">

        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition
                ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}

      </div>

    </div>
  );
}
