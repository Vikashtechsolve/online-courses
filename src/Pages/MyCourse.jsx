import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, CirclePlay, UserRound, Loader2, Award, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCourses } from "../utils/coursesApi";
import { getUser } from "../utils/auth";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const user = getUser();
      if (!user?._id) {
        setCourses([]);
        return;
      }
      const data = await getCourses({ student: user._id });
      setCourses(data.courses || []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">My Courses</span>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Courses</h1>
        <p className="text-slate-600 mt-1">
          Track your enrolled courses and continue learning at your own pace.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No courses enrolled yet</p>
          <p className="text-slate-500 text-sm mt-1">
            You will see your courses here once you are enrolled in a batch.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courses.map((course) => {
            const teacherCount = course.teachers ?? 0;
            const lectureCount = course.lectures ?? 0;
            return (
              <div
                key={course._id}
                onClick={() => navigate(`/course/${course._id}`)}
                className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-slate-900 font-semibold text-lg leading-tight flex-1 min-w-0">
                    {course.title}
                  </h2>
                  {course.completedAt ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-1 shrink-0">
                      <CheckCircle size={12} />
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 rounded-full px-2.5 py-1 shrink-0">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <UserRound size={14} />
                    {teacherCount} teacher{teacherCount !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CirclePlay size={14} />
                    {lectureCount} lecture{lectureCount !== 1 ? "s" : ""}
                  </span>
                </div>

                {course.description && (
                  <p className="text-sm text-slate-500 mt-3 line-clamp-2">
                    {course.description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/course/${course._id}`);
                    }}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </button>
                  {course.completedAt && (
                    <Link
                      to="/certificates"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <Award size={16} />
                      View Certificate
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
