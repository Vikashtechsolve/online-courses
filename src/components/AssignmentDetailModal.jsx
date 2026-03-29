import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import {
  X,
  Calendar,
  Clock,
  FileText,
  ExternalLink,
  Send,
  Link2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { submitAssignment } from "../utils/assignmentsApi";

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

export default function AssignmentDetailModal({
  assignment,
  onClose,
  onSubmitted,
}) {
  const [submissionLink, setSubmissionLink] = useState(
    assignment?.submission?.submissionLink || ""
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSubmissionLink(assignment?.submission?.submissionLink || "");
  }, [assignment?._id, assignment?.submission?.submissionLink]);

  const submission = assignment?.submission;
  const isSubmitted = !!submission?.submissionLink;
  const isGraded = submission?.status === "graded";
  const courseTitle = assignment?.course?.title || "Course";

  const sanitizedDescription = assignment?.description
    ? DOMPurify.sanitize(assignment.description, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "b",
          "em",
          "i",
          "u",
          "ul",
          "ol",
          "li",
          "h1",
          "h2",
          "h3",
          "h4",
          "a",
          "code",
          "pre",
          "blockquote",
          "hr",
          "span",
          "div",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
      })
    : "";

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
      onSubmitted?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!assignment) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="pr-10">
            <span className="text-xs font-medium text-slate-500">{courseTitle}</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {assignment.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                Due {formatDate(assignment.dueDate)}
              </span>
              {assignment.estimatedTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {assignment.estimatedTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Description - Rich HTML */}
          {assignment.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                Instructions
              </h3>
              <div
                className="assignment-description rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-slate-700 text-sm leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_a]:text-blue-600 [&_a]:underline [&_code]:bg-slate-200 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-slate-200 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>
          )}

          {/* Attachment */}
          {assignment.attachmentUrl && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                Attachment
              </h3>
              <a
                href={assignment.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-blue-600 font-medium"
              >
                <FileText size={18} />
                View / Download
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Grade & Feedback */}
          {isGraded && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-medium mb-1">
                <CheckCircle2 size={18} />
                Graded
              </div>
              {submission?.grade && (
                <p className="font-semibold text-emerald-800">
                  Grade: {submission.grade}
                </p>
              )}
              {submission?.feedback && (
                <p className="text-sm text-emerald-700 mt-2 italic">
                  {submission.feedback}
                </p>
              )}
            </div>
          )}

          {/* Submit Section */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              {isSubmitted ? "Your Submission" : "Submit Assignment"}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Share your project link, GitHub repository, or Google Drive link.
            </p>
            <div className="relative mb-4">
              <Link2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="url"
                placeholder="https://github.com/username/repo or https://drive.google.com/..."
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSubmitting ? "Submitting..." : isSubmitted ? "Update Submission" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
