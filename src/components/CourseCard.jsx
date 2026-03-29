import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, title, mentor, duration }) {
  const navigate = useNavigate();
  const displayTitle = course?.title || title || "Course";
  const displayMentor = course?.teachers
    ? `${course.teachers} teacher${course.teachers !== 1 ? "s" : ""}`
    : mentor || "—";
  const displayDuration = course?.lectures
    ? `${course.lectures} lecture${course.lectures !== 1 ? "s" : ""}`
    : duration || "—";

  const handleClick = () => {
    if (course?._id) navigate(`/course/${course._id}`);
  };

  return (
    <div
      onClick={course?._id ? handleClick : undefined}
      className={`rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow ${
        course?._id ? "cursor-pointer" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Ongoing Course
      </p>
      <h4 className="text-slate-900 font-semibold text-lg mt-1">{displayTitle}</h4>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-700">Mentor:</span> {displayMentor}
        </p>
        <p>
          <span className="font-medium text-slate-700">Content:</span> {displayDuration}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (course?._id) navigate(`/course/${course._id}`);
        }}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        Continue Learning
      </button>
    </div>
  );
}
