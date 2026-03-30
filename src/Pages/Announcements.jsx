import { useState, useEffect, useCallback } from "react";
import { CalendarDays, Megaphone, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getAnnouncements, markAnnouncementsRead } from "../utils/announcementsApi";
import { getCourses } from "../utils/coursesApi";
import { getUser } from "../utils/auth";
import { formatDate } from "../utils/date";

export default function Announcements() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState("All");

  const user = getUser();
  const unreadOnly = searchParams.get("view") === "unread";

  const loadCourses = useCallback(async () => {
    if (!user?._id) return;
    try {
      const data = await getCourses({ student: user._id });
      setCourses(data.courses || []);
    } catch {
      setCourses([]);
    }
  }, [user?._id]);

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const params =
        courseFilter !== "All" && /^[a-fA-F0-9]{24}$/.test(courseFilter)
          ? { course: courseFilter }
          : {};
      const { announcements: list } = await getAnnouncements(params);
      setAnnouncements(list);
    } catch {
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  }, [courseFilter]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  useEffect(() => {
    if (unreadOnly) return;
    const unreadIds = announcements.filter((a) => !a.isRead).map((a) => a._id);
    if (unreadIds.length === 0) return;
    let active = true;
    (async () => {
      try {
        await markAnnouncementsRead(unreadIds);
        if (!active) return;
        setAnnouncements((prev) => prev.map((a) => ({ ...a, isRead: true })));
        window.dispatchEvent(new Event("announcements:updated"));
      } catch {
        // no-op
      }
    })();
    return () => {
      active = false;
    };
  }, [announcements, unreadOnly]);

  const displayedAnnouncements = unreadOnly
    ? announcements.filter((item) => !item.isRead)
    : announcements;

  const markVisibleUnreadAsRead = async () => {
    const unreadIds = displayedAnnouncements.filter((a) => !a.isRead).map((a) => a._id);
    if (unreadIds.length === 0) return;
    try {
      await markAnnouncementsRead(unreadIds);
      setAnnouncements((prev) => prev.map((a) => ({ ...a, isRead: true })));
      window.dispatchEvent(new Event("announcements:updated"));
      const next = new URLSearchParams(searchParams);
      next.delete("view");
      setSearchParams(next);
    } catch {
      // no-op
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Announcements</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-600 mt-1">
          Stay updated with the latest course-related announcements and important notices from your
          coordinators.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm text-slate-600">Filter by course</p>
          {unreadOnly ? (
            <button
              type="button"
              onClick={markVisibleUnreadAsRead}
              className="text-xs text-blue-700 hover:text-blue-800 mt-1"
            >
              Mark all unread as seen
            </button>
          ) : null}
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 max-w-xs w-full sm:w-auto"
        >
          <option value="All">All my courses</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 text-sm">Loading announcements...</p>
        </div>
      ) : displayedAnnouncements.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">
            {unreadOnly ? "No unread announcements." : "No announcements yet."}
          </p>
          <p className="text-slate-500 text-sm mt-2">
            {unreadOnly
              ? "You are all caught up."
              : "Your course coordinators will post updates here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAnnouncements.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 md:p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 rounded-full bg-white border border-slate-200 w-9 h-9 inline-flex items-center justify-center shrink-0">
                    <Megaphone className="text-blue-600" size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
                      {item.course?.title || "Course"}
                      {item.course?.batch?.name ? ` · ${item.course.batch.name}` : ""}
                    </span>
                    {!item.isRead ? (
                      <span className="inline-flex text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 mb-2 ml-2">
                        New
                      </span>
                    ) : (
                      <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mb-2 ml-2">
                        Seen
                      </span>
                    )}
                    <h3 className="text-slate-900 font-semibold text-lg leading-6">{item.title}</h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 w-fit shrink-0">
                  <CalendarDays size={14} />
                  {formatDate(item.createdAt)}
                </div>
              </div>

              <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap pl-0 sm:pl-12">
                {item.body}
              </p>
              {item.author?.name ? (
                <p className="text-xs text-slate-500 mt-3 pl-0 sm:pl-12">— {item.author.name}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
