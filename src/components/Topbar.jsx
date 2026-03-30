import { useCallback, useEffect, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import { getUnreadAnnouncementsCount } from "../utils/announcementsApi";

export default function Topbar({ setIsOpen }) {
  const user = getUser();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = useCallback(async () => {
    try {
      const count = await getUnreadAnnouncementsCount();
      setUnreadCount(count);
    } catch {
      setUnreadCount(0);
    }
  }, []);

  useEffect(() => {
    loadUnreadCount();
    const interval = setInterval(loadUnreadCount, 120000);
    const onAnnouncementUpdated = () => loadUnreadCount();
    window.addEventListener("announcements:updated", onAnnouncementUpdated);
    return () => {
      clearInterval(interval);
      window.removeEventListener("announcements:updated", onAnnouncementUpdated);
    };
  }, [loadUnreadCount]);

  return (
    <div className="w-full bg-white px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 border-b border-gray-200 min-h-[52px]">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <button
          type="button"
          className="md:hidden shrink-0 p-1 -ml-1 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="relative flex-1 min-w-0 max-w-md">
          <Search
            size={18}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/30 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={() => navigate("/announcements?view=unread")}
          className="relative cursor-pointer p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 shrink-0"
          aria-label="Open unread announcements"
        >
          <Bell size={20} />
          {unreadCount > 0 ? (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] leading-none min-w-4 h-4 px-1 flex items-center justify-center rounded-full font-medium">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 min-w-0 max-w-[min(100%,11rem)] sm:max-w-56 md:max-w-64 rounded-lg pl-1 pr-1 sm:pr-2 py-1 text-left hover:bg-gray-50 transition-colors"
          aria-label="Profile"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="size-9 sm:size-10 rounded-full object-cover shrink-0 ring-2 ring-white shadow-sm border border-gray-100"
            />
          ) : (
            <div className="size-9 sm:size-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold text-sm shrink-0 ring-2 ring-white border border-violet-200/60">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
          )}
          <span className="hidden sm:block text-sm font-medium text-slate-800 truncate leading-tight">
            {user?.name || "Student"}
          </span>
        </button>
      </div>
    </div>
  );
}
