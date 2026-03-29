import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import SessionCard from "../components/SessionCard";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentDetailModal from "../components/AssignmentDetailModal";
import { useNavigate } from "react-router-dom";
import { BookOpenCheck, CalendarClock, FileClock, Loader2 } from "lucide-react";
import home from "./MyCourses/data/home.png";
import { getUser } from "../utils/auth";
import { getCourses } from "../utils/coursesApi";
import { getAssignments } from "../utils/assignmentsApi";
import { getLectures } from "../utils/lecturesApi";

function formatSessionTime(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [todaySessions, setTodaySessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    if (user?._id) loadData();
  }, [user?._id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [coursesRes, assignmentsRes] = await Promise.all([
        getCourses({ student: user._id }),
        getAssignments({ student: user._id }),
      ]);
      const enrolledCourses = coursesRes.courses || [];
      setCourses(enrolledCourses);

      const allAssignments = assignmentsRes.assignments || [];
      setAssignments(allAssignments);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const sessionPromises = enrolledCourses.map((course) =>
        getLectures({ course: course._id })
      );
      const sessionResults = await Promise.all(sessionPromises);
      const todaysLectures = sessionResults
        .flatMap((result) => result.lectures || [])
        .filter((lecture) => {
          if (!lecture?.scheduledAt) return false;
          const scheduled = new Date(lecture.scheduledAt);
          return scheduled >= today && scheduled < tomorrow;
        })
        .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

      setTodaySessions(todaysLectures);
      return allAssignments;
    } catch {
      setCourses([]);
      setAssignments([]);
      setTodaySessions([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const pendingAssignments = assignments.filter((a) => !a.submission?.submissionLink);
  const displayAssignments = pendingAssignments.slice(0, 3);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
              Student Dashboard
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Welcome back, {user?.name || "Student"}
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Continue your learning journey and stay consistent today. You are
              doing great - keep the streak going.
            </p>
          </div>

          <img
            src={home}
            className="w-36 md:w-44 object-contain"
            alt="Learning illustration"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <BookOpenCheck size={16} />
              Ongoing Courses
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {loading ? "—" : courses.length} Active
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <CalendarClock size={16} />
              Today's Sessions
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {loading ? "—" : todaySessions.length} Sessions
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <FileClock size={16} />
              Pending Assignments
            </div>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {loading ? "—" : pendingAssignments.length} Pending
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Today's Sessions
          </h3>
          <p className="text-sm text-slate-500">
            All sessions scheduled for today. Join directly from here.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {loading ? (
            <div className="flex justify-center py-12 col-span-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : todaySessions.length > 0 ? (
            todaySessions.map((session) => (
              <SessionCard
                key={session._id}
                title={session.title}
                date={formatSessionTime(session.scheduledAt)}
                time={session.duration ? `${session.duration} min` : ""}
                mentor={session.teacher?.name || "Teacher"}
                meetingLink={session.meetingLink}
                courseTitle={session.course?.title || "Course"}
              />
            ))
          ) : (
            <p className="text-slate-500 col-span-full">
              No sessions scheduled for today.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Ongoing Courses</h3>
          <p className="text-sm text-slate-500">
            Continue your enrolled programs and track progress.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Overall Progress
          </h3>
          <p className="text-sm text-slate-500">
            Course-wise completion overview.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {courses.slice(0, 2).map((course) => (
            <ProgressBar
              key={course._id}
              title={course.title}
              progress={`${Math.min(75, (course.lectures || 0) * 5)}%`}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Pending Assignments
            </h3>
            <p className="text-sm text-slate-500">
              Submit before the due date to keep your progress on track.
            </p>
          </div>
          <button
            onClick={() => navigate("/assignments")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {displayAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onClick={(a) => setSelectedAssignment(a)}
            />
          ))}
          {!loading && displayAssignments.length === 0 && (
            <p className="text-slate-500 col-span-full">No pending assignments.</p>
          )}
        </div>

        {selectedAssignment && (
          <AssignmentDetailModal
            assignment={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
            onSubmitted={async () => {
              const list = await loadData();
              const updated = list?.find((a) => a._id === selectedAssignment._id);
              if (updated) setSelectedAssignment(updated);
            }}
          />
        )}
      </section>
    </div>
  );
}
