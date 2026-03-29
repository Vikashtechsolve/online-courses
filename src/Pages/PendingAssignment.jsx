import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import AssignmentDetailModal from "../components/AssignmentDetailModal";
import { ArrowLeft, Loader2, FileText, BookOpen } from "lucide-react";
import { getAssignments } from "../utils/assignmentsApi";
import { getUser } from "../utils/auth";

export default function PendingAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const user = getUser();

  useEffect(() => {
    if (user?._id) loadAssignments();
  }, [user?._id]);

  const loadAssignments = async () => {
    setLoading(true);
    try {
      const data = await getAssignments({ student: user._id });
      const all = data.assignments || [];
      const pending = all.filter((a) => !a.submission?.submissionLink);
      setAssignments(pending);
    } catch {
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-slate-50 to-slate-100/50 min-h-full">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <span
          onClick={() => navigate("/dashboard")}
          className="hover:text-blue-600 cursor-pointer transition-colors"
        >
          Dashboard
        </span>
        <span>›</span>
        <span className="text-slate-700 font-medium">Pending Assignments</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pending Assignments
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Complete these before the due date to stay on track.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            All caught up!
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
            You have no pending assignments. Great job staying on top of your
            work.
          </p>
          <button
            onClick={() => navigate("/assignments")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <BookOpen size={16} />
            View All Assignments
          </button>
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
                const data = await getAssignments({ student: user._id });
                const all = data.assignments || [];
                const pending = all.filter((a) => !a.submission?.submissionLink);
                setAssignments(pending);
                setSelectedAssignment(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
