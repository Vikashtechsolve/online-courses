import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MessageSquareMore, RotateCcw, SendHorizontal } from "lucide-react";
import {
  fetchTicket,
  studentReply,
  reopenTicket,
  formatTicketDate,
} from "../utils/ticketsApi";

export default function SupportTicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [reopenText, setReopenText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTicket = useCallback(async () => {
    try {
      const t = await fetchTicket(ticketId);
      setTicket(t);
    } catch {
      setTicket(null);
    }
  }, [ticketId]);

  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  if (!ticket) {
    return (
      <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 text-center">
          <p className="text-slate-700 mb-4">Ticket not found.</p>
          <button
            type="button"
            onClick={() => navigate("/support")}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Back to Support
          </button>
        </div>
      </div>
    );
  }

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    if (!replyText.trim()) {
      setError("Please write your message before sending.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const updated = await studentReply(ticket._id, { text: replyText.trim() });
      setTicket(updated);
      setReplyText("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not send reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReopen = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const updated = await reopenTicket(ticket._id, reopenText.trim());
      setTicket(updated);
      setReopenText("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not reopen ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messages = ticket.messages || [];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <Link to="/support" className="hover:text-blue-600 transition-colors cursor-pointer">
          Support / Help
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{ticket.ticketNumber}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{ticket.title}</h1>
            <p className="text-sm text-slate-600 mt-1">
              {ticket.course} | {ticket.category} | Created{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </p>
          </div>

          <span
            className={`text-xs font-medium rounded-full px-2.5 py-1 w-fit ${
              ticket.status === "resolved"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {ticket.status === "resolved" ? "Resolved" : "Open"}
          </span>
        </div>
        {ticket.attachmentUrl ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <p className="font-medium text-slate-800">Student attachment</p>
            {ticket.attachmentName ? (
              <p className="text-slate-600 text-xs mt-1">{ticket.attachmentName}</p>
            ) : null}
            <a
              href={ticket.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Open or download file
            </a>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-5 space-y-4">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <MessageSquareMore size={16} />
          Conversation
        </div>

        <div className="space-y-3">
          {messages.map((message) => {
            const isStaff = message.authorRole === "staff";
            const label = isStaff
              ? `Support${message.author?.name ? ` · ${message.author.name}` : ""}`
              : "You";
            return (
              <div
                key={message._id}
                className={`rounded-xl border p-4 ${
                  isStaff ? "bg-white border-blue-200" : "bg-violet-50 border-violet-200"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      isStaff ? "text-blue-700" : "text-violet-700"
                    }`}
                  >
                    {label}
                  </p>
                  <p className={`text-xs ${isStaff ? "text-slate-500" : "text-violet-600"}`}>
                    {formatTicketDate(message.createdAt)}
                  </p>
                </div>
                <p
                  className={`text-sm leading-relaxed mt-2 ${
                    isStaff ? "text-slate-700" : "text-slate-800"
                  }`}
                >
                  {message.text}
                </p>
                {message.attachmentName || message.attachmentUrl ? (
                  <div className={`text-xs mt-2 space-y-1 ${isStaff ? "text-slate-500" : "text-violet-700"}`}>
                    {message.attachmentName ? <p>File: {message.attachmentName}</p> : null}
                    {message.attachmentUrl ? (
                      <a
                        href={message.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex font-medium text-blue-600 hover:text-blue-800 underline"
                      >
                        View / download attachment
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {ticket.status === "open" ? (
        <form
          onSubmit={handleReplySubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3"
        >
          <label className="text-sm font-medium text-slate-800">Reply</label>
          <textarea
            rows="4"
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="Write your response or additional details..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <SendHorizontal size={14} />
            {isSubmitting ? "Sending..." : "Send Reply"}
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-3">
          <p className="text-sm text-slate-600">
            This ticket is resolved. Read the support reply above. If you still need help, reopen the
            ticket and add a short note.
          </p>
          <textarea
            rows="3"
            value={reopenText}
            onChange={(e) => setReopenText(e.target.value)}
            placeholder="Optional: what do you still need help with?"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleReopen}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white cursor-pointer disabled:opacity-60"
          >
            <RotateCcw size={14} />
            {isSubmitting ? "Reopening..." : "Reopen ticket"}
          </button>
        </div>
      )}
    </div>
  );
}
