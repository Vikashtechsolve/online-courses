import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200">

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={20} />

          {/* Badge */}
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            8
          </span>
        </div>

        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
        />

      </div>

    </div>
  );
}
