import { Calendar, ChevronRight, Clock, CheckCircle2 } from "lucide-react";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDaysUntilDue(dueDate) {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
}

export default function AssignmentCard({ assignment, onClick }) {
  const submission = assignment.submission;
  const isSubmitted = !!submission?.submissionLink;
  const isGraded = submission?.status === "graded";
  const courseTitle = assignment.course?.title || "Course";
  const daysLeft = getDaysUntilDue(assignment.dueDate);

  const getStatusStyle = () => {
    if (isGraded) return "bg-emerald-100 text-emerald-700";
    if (isSubmitted) return "bg-blue-100 text-blue-700";
    return "bg-amber-100 text-amber-700";
  };

  const getStatusLabel = () => {
    if (isGraded) return "Graded";
    if (isSubmitted) return "Submitted";
    return "Pending";
  };

  return (
    <div
      onClick={() => onClick?.(assignment)}
      className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-slate-900 truncate">
            {assignment.title}
          </h3>
          <span
            className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-medium ${getStatusStyle()}`}
          >
            {getStatusLabel()}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
          <span>{courseTitle}</span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Due {formatDate(assignment.dueDate)}
          </span>
          {daysLeft !== null && daysLeft >= 0 && !isSubmitted && daysLeft <= 2 && (
            <span
              className={
                daysLeft <= 0
                  ? "text-red-600 font-medium"
                  : "text-amber-600 font-medium"
              }
            >
              {daysLeft === 0 ? "Due today" : `${daysLeft}d left`}
            </span>
          )}
        </div>
      </div>
      <ChevronRight
        size={20}
        className="text-slate-400 group-hover:text-slate-600 shrink-0"
      />
    </div>
  );
}
