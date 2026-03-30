import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Video,
  CalendarDays,
  Clock3,
  UserRound,
  FileText,
  Loader2,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentDetailModal from "../components/AssignmentDetailModal";
import { getUser } from "../utils/auth";
import { getCourses } from "../utils/coursesApi";
import { getTodayLectures } from "../utils/lecturesApi";
import { getAssignments } from "../utils/assignmentsApi";
import { formatDateTime } from "../utils/date";

function isCreatedToday(dateValue) {
  if (!dateValue) return false;
  const created = new Date(dateValue);
  const today = new Date();
  created.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return created.getTime() === today.getTime();
}

export default function LiveSessions() {
  const navigate = useNavigate();
  const user = getUser();
  const [todaySessions, setTodaySessions] = useState([]);
  const [todayAssignments, setTodayAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    if (user?._id) loadData();
  }, [user?._id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, assignmentsRes, todayRes] = await Promise.all([
        getCourses({ student: user._id }),
        getAssignments({ student: user._id }),
        getTodayLectures(user._id),
      ]);
      const enrolledCourses = coursesRes.courses || [];
      const allAssignments = assignmentsRes.assignments || [];
      const enrolledCourseIds = new Set(enrolledCourses.map((c) => c._id));
      const myAssignments = allAssignments.filter((a) => {
        const cid = a.course?._id || a.course;
        return enrolledCourseIds.has(cid);
      });

      const todaysAssignments = myAssignments.filter((a) =>
        isCreatedToday(a.createdAt || a.assignedAt)
      );

      setTodaySessions(todayRes.lectures || []);
      setTodayAssignments(todaysAssignments);
    } catch {
      setTodaySessions([]);
      setTodayAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <RouterLink
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </RouterLink>
        <span>/</span>
        <span className="font-medium text-slate-700">Live Sessions</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Today&apos;s Schedule
            </h1>
            <p className="text-slate-600 mt-1 max-w-2xl">
              Today&apos;s live sessions and new assignments for your courses. Join classes and keep
              track of new work.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
              <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">Sessions</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
                {loading ? "—" : todaySessions.length}
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
              <p className="text-xs font-medium text-amber-700 uppercase tracking-wide">Assignments</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
                {loading ? "—" : todayAssignments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 text-sm">Loading today&apos;s schedule...</p>
        </div>
      ) : (
        <>
          {/* Today's Sessions */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Video size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Today&apos;s Sessions
                </h2>
                <p className="text-sm text-slate-500">
                  Lectures scheduled for today. Join live or view recorded content.
                </p>
              </div>
            </div>

            {todaySessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {todaySessions.map((session) => (
                  <div
                    key={session._id}
                    className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        Today&apos;s Session
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {session.course?.title || "Course"}
                      </span>
                    </div>
                    <h3 className="text-slate-900 font-semibold text-lg leading-tight">
                      {session.title}
                    </h3>

                    <div className="grid grid-cols-1 gap-2.5 mt-4 text-sm text-slate-600">
                      <p className="inline-flex items-center gap-2">
                        <UserRound size={15} className="text-slate-500 shrink-0" />
                        <span className="font-medium text-slate-700">Mentor:</span>{" "}
                        {session.teacher?.name || "Teacher"}
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <CalendarDays size={15} className="text-slate-500 shrink-0" />
                        <span className="font-medium text-slate-700">Date:</span>{" "}
                        {formatDateTime(session.scheduledAt)}
                      </p>
                      {session.duration && (
                        <p className="inline-flex items-center gap-2">
                          <Clock3 size={15} className="text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-700">Duration:</span>{" "}
                          {session.duration} min
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {session.meetingLink ? (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-colors"
                        >
                          <Video size={16} />
                          Join Session
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 bg-slate-200 text-slate-500 text-sm px-4 py-2.5 rounded-xl font-medium cursor-not-allowed"
                        >
                          <Video size={16} />
                          Link Not Added
                        </button>
                      )}
                      {session.course?._id && (
                        <button
                          onClick={() =>
                            navigate(`/course/${session.course._id}/session/${session._id}`)
                          }
                          className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm px-4 py-2.5 rounded-xl font-medium transition-colors"
                        >
                          <BookOpen size={16} />
                          View Session
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <Video className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-slate-700 mb-2">
                  No sessions today
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  There are no lectures scheduled for today. Check your courses for upcoming sessions.
                </p>
                <RouterLink
                  to="/mycourses"
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View My Courses
                  <ExternalLink size={14} />
                </RouterLink>
              </div>
            )}
          </section>

          {/* Today's Assignments */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-100">
                <FileText size={20} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Today&apos;s Assignments
                </h2>
                <p className="text-sm text-slate-500">
                  Assignments created today for your courses. Check due dates on each card.
                </p>
              </div>
            </div>

            {todayAssignments.length > 0 ? (
              <div className="space-y-3">
                {todayAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment._id}
                    assignment={assignment}
                    onClick={(a) => setSelectedAssignment(a)}
                  />
                ))}
                <div className="flex justify-end pt-2">
                  <RouterLink
                    to="/assignments"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View all assignments
                    <ExternalLink size={14} />
                  </RouterLink>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-semibold text-slate-700 mb-2">
                  No new assignments today
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Nothing was posted today. Open Assignments for all tasks and deadlines.
                </p>
                <RouterLink
                  to="/assignments"
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Assignments
                  <ExternalLink size={14} />
                </RouterLink>
              </div>
            )}
          </section>

          {selectedAssignment && (
            <AssignmentDetailModal
              assignment={selectedAssignment}
              onClose={() => setSelectedAssignment(null)}
              onSubmitted={async () => {
                await loadData();
                setSelectedAssignment(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
