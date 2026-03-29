import { useState } from "react";
import { X, Link2, Loader2, Send, FileText } from "lucide-react";
import { submitAssignment } from "../utils/assignmentsApi";

export default function AssignmentSubmissionModal({
  assignment,
  onClose,
  onSubmit,
}) {
  const [submissionLink, setSubmissionLink] = useState(
    assignment?.submission?.submissionLink || ""
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const link = submissionLink.trim();
    if (!link) {
      setError("Please provide a project/GitHub or drive link.");
      return;
    }

    try {
      new URL(link);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await submitAssignment(assignment._id, link);
      onSubmit?.();
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit assignment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Submit Assignment</h2>
              <p className="text-blue-100 text-sm mt-0.5 truncate max-w-xs">
                {assignment?.title}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-slate-600 text-sm">
            Share your project link, GitHub repository, or Google Drive link for
            review.
          </p>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Submission Link <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="url"
                placeholder="https://github.com/username/repo or https://drive.google.com/..."
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
