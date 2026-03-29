import { useEffect, useMemo, useState, useCallback } from "react";
import {
  CircleDot,
  MessageSquareMore,
  Plus,
  TicketCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchTickets } from "../utils/ticketsApi";

export default function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("open");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchTickets();
      setTickets(list);
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const unresolvedCount = useMemo(
    () => tickets.filter((t) => t.status === "open").length,
    [tickets]
  );
  const resolvedCount = useMemo(
    () => tickets.filter((t) => t.status === "resolved").length,
    [tickets]
  );

  const visibleTickets = tickets.filter((t) => t.status === activeTab);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Support / Help</span>
      </div>

      {location.state?.created && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">
          Ticket created successfully. Our support team will respond soon.
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Support / Help
            </h1>
            <p className="text-slate-600 mt-1">
              Raise and track your support tickets in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/support/create-ticket")}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Create Ticket
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-xs text-slate-500">Total Tickets</p>
            <p className="text-xl font-semibold text-slate-900">{tickets.length}</p>
          </div>
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-xs text-slate-500">Open</p>
            <p className="text-xl font-semibold text-amber-700">{unresolvedCount}</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-xs text-slate-500">Resolved</p>
            <p className="text-xl font-semibold text-emerald-700">{resolvedCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-1 inline-flex">
        <button
          type="button"
          onClick={() => setActiveTab("open")}
          className={`px-5 py-2.5 text-sm rounded-lg transition cursor-pointer ${
            activeTab === "open"
              ? "bg-white text-slate-900 font-medium shadow-sm"
              : "text-slate-600"
          }`}
        >
          Open ({unresolvedCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("resolved")}
          className={`px-5 py-2.5 text-sm rounded-lg transition cursor-pointer ${
            activeTab === "resolved"
              ? "bg-white text-slate-900 font-medium shadow-sm"
              : "text-slate-600"
          }`}
        >
          Resolved ({resolvedCount})
        </button>
      </div>

      {loading ? (
        <p className="text-center text-slate-500 py-12">Loading tickets...</p>
      ) : (
        <div className="space-y-4">
          {visibleTickets.length > 0 ? (
            visibleTickets.map((ticket) => (
              <div
                key={ticket._id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/support/ticket/${ticket._id}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/support/ticket/${ticket._id}`)}
                className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-white border border-slate-200 px-2.5 py-1 text-slate-600">
                        <TicketCheck size={13} />
                        {ticket.ticketNumber}
                      </span>
                      <span
                        className={`text-xs font-medium rounded-full px-2.5 py-1 ${
                          ticket.status === "resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {ticket.status === "resolved" ? "Resolved" : "Open"}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">{ticket.title}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                      {ticket.description}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <p>
                        <span className="font-medium">Course:</span> {ticket.course}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span> {ticket.category}
                      </p>
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {ticket.createdAt
                          ? new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                      {ticket.attachmentName ? (
                        <p>
                          <span className="font-medium">Attachment:</span> {ticket.attachmentName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    {ticket.status === "resolved" ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/support/ticket/${ticket._id}`);
                        }}
                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <CircleDot size={16} />
                        View / Reopen
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/support/ticket/${ticket._id}`);
                      }}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      <MessageSquareMore size={15} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-slate-600 text-sm">
                No tickets in this list.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
