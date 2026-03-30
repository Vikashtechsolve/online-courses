import logo from "../assets/logo.png";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  Award,
  Megaphone,
  CircleHelp,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "My Courses", icon: BookOpen, path: "/mycourses" },
    { name: "Live Sessions", icon: Video, path: "/livesessions" },
    { name: "Assignments", icon: FileText, path: "/assignments" },
    { name: "Certificates", icon: Award, path: "/certificates" },
    { name: "Announcements", icon: Megaphone, path: "/announcements" },
    { name: "Support/Help", icon: CircleHelp, path: "/support" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          w-[240px] bg-white border-r border-gray-200 h-screen
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
   
        <div className="flex items-cente justify-between px-4  border-b md:border-none">
          <NavLink to="/dashboard" className="flex items-center">
            <img
              src={logo}
              alt="VTS Logo"
              className="h-24 md:h-32 w-auto object-contain lg:-mt-6"
            />
          </NavLink>

     
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

      
        <div className="space-y-2 px-3 mt-3">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition
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
    </>
  );
}
