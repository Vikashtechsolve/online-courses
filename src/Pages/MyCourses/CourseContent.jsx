import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Search, Loader2, FileText, Calendar } from "lucide-react";
import { getCourseById } from "../../utils/coursesApi";
import { getLectures } from "../../utils/lecturesApi";

const statusMap = {
  live: "Live",
  completed: "Completed",
  recorded: "Recorded",
  upcoming: "Upcoming",
  draft: "Draft",
};

const getBadgeStyle = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "live") return "bg-red-50 text-red-700 border-red-100";
  if (s === "completed" || s === "recorded")
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (s === "upcoming") return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-slate-50 text-slate-600 border-slate-200";
};

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CourseContent() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [courseRes, lecturesRes] = await Promise.all([
        getCourseById(courseId),
        getLectures({ course: courseId }),
      ]);
      setCourse(courseRes);
      setLectures(lecturesRes.lectures || []);
    } catch {
      setCourse(null);
      setLectures([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLectures = lectures
    .filter((lec) => {
      if (activeTab === "All") return true;
      if (activeTab === "Upcoming")
        return ["upcoming", "live", "draft"].includes((lec.status || "").toLowerCase());
      if (activeTab === "Past")
        return ["completed", "recorded"].includes((lec.status || "").toLowerCase());
      if (activeTab === "Recorded")
        return (lec.status || "").toLowerCase() === "recorded";
      return true;
    })
    .filter((lec) =>
      (lec.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  const isBeforeStart = (lecture) => {
    const scheduledAt = lecture?.scheduledAt;
    if (!scheduledAt) return false;
    return new Date() < new Date(scheduledAt);
  };

  const hasMeetingLink = (lecture) => !!lecture?.meetingLink;

  if (loading && !course) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <p className="text-slate-600">Course not found.</p>
        <Link to="/mycourses" className="text-blue-600 hover:underline mt-2 inline-block">
          Back to My Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <Link to="/mycourses" className="hover:text-blue-600 transition-colors cursor-pointer">
          My Courses
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{course.title}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Course Content</h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse all lectures, recordings, and upcoming releases.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search lecture by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-2">
            {["All", "Upcoming", "Past", "Recorded"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-slate-900 font-medium shadow-sm"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            to={`/assignments?course=${courseId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium"
          >
            <FileText size={16} />
            View Assignments
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture) => {
            const status = lecture.status || "draft";
            const statusLabel = statusMap[status] || status;
            const beforeStart = isBeforeStart(lecture);
            const hasLink = hasMeetingLink(lecture);
            const sessionPath = `/course/${courseId}/session/${lecture._id}`;
            const canViewDetails = !beforeStart;

            return (
              <div
                key={lecture._id}
                onClick={() => canViewDetails && navigate(sessionPath)}
                className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all ${
                  canViewDetails ? "hover:shadow-md cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getBadgeStyle(
                          status
                        )}`}
                      >
                        {statusLabel}
                      </span>
                      <span className="text-xs text-slate-500">
                        {lecture.teacher?.name || "Teacher"}
                      </span>
                    </div>

                    {canViewDetails ? (
                      <Link
                        to={sessionPath}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(sessionPath);
                        }}
                        className="font-semibold text-slate-900 text-base md:text-lg block hover:text-blue-700"
                      >
                        {lecture.title}
                      </Link>
                    ) : (
                      <span className="font-semibold text-slate-900 text-base md:text-lg block">
                        {lecture.title}
                      </span>
                    )}

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      {lecture.teacher?.name && (
                        <span>{lecture.teacher.name}</span>
                      )}
                      {lecture.scheduledAt && (
                        <>
                          <span>|</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(lecture.scheduledAt)}
                          </span>
                        </>
                      )}
                      {lecture.duration && (
                        <>
                          <span>|</span>
                          <span>{lecture.duration} min</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="self-start lg:self-auto flex items-center gap-2 flex-wrap">
                    {beforeStart && hasLink && (
                      <a
                        href={lecture.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        Join
                      </a>
                    )}
                    {canViewDetails && (
                      <Link
                        to={sessionPath}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        View Lecture Details
                      </Link>
                    )}
                    {!beforeStart && hasLink && (
                      <a
                        href={lecture.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-red-200"
                      >
                        Join Live
                      </a>
                    )}
                    {beforeStart && !hasLink && (
                      <span className="inline-flex bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm cursor-default">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 text-sm">
            No lectures found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
