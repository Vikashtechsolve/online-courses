import { useState, useEffect } from "react";
import { Loader2, FileText, Filter, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentDetailModal from "../components/AssignmentDetailModal";
import { getAssignments } from "../utils/assignmentsApi";
import { getCourses } from "../utils/coursesApi";
import { getUser } from "../utils/auth";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFilter, setCourseFilter] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const user = getUser();

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (user?._id) loadAssignments();
  }, [courseFilter, user?._id]);

  const loadCourses = async () => {
    try {
      if (!user?._id) return;
      const data = await getCourses({ student: user._id });
      setCourses(data.courses || []);
    } catch {
      setCourses([]);
    }
  };

  const loadAssignments = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const params = { student: user?._id };
      if (courseFilter) params.course = courseFilter;
      const data = await getAssignments(params);
      const list = data.assignments || [];
      setAssignments(list);
      return list;
    } catch {
      setAssignments([]);
      return [];
    } finally {
      if (!silent) setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-slate-100/50 min-h-full">
      {/* Breadcrumb */}
      <div className="text-sm flex items-center gap-2 text-slate-500 mb-6">
        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Assignments</span>
      </div>

      {/* Hero Header */}
      <div className="rounded-2xl bg-blue-50/80 border border-blue-100 p-6 md:p-8 shadow-sm mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-blue-100">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Assignments</h1>
            </div>
            <p className="text-slate-600 text-sm md:text-base max-w-xl">
              Submit your work by sharing project links, GitHub repositories, or
              Google Drive links. Stay on top of deadlines and track your progress.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        {courses.length > 0 && (
          <div className="mt-6 flex items-center gap-3">
            <Filter size={18} className="text-slate-500" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              <option value="" className="text-slate-800">
                All Courses
              </option>
              {courses.map((c) => (
                <option key={c._id} value={c._id} className="text-slate-800">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 text-sm">Loading assignments...</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No assignments yet
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
            Assignments from your enrolled courses will appear here. Check back
            later or explore your courses.
          </p>
          <Link
            to="/mycourses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <BookOpen size={16} />
            Go to My Courses
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                onClick={(a) => setSelectedAssignment(a)}
              />
            ))}
          </div>

          {selectedAssignment && (
            <AssignmentDetailModal
              assignment={selectedAssignment}
              onClose={() => setSelectedAssignment(null)}
              onSubmitted={async () => {
                const list = await loadAssignments(true);
                const updated = list.find((a) => a._id === selectedAssignment._id);
                if (updated) setSelectedAssignment(updated);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
