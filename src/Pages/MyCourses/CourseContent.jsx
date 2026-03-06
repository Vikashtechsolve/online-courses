import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import allData from "./data/reactCourseAll.json";

export default function CourseContent() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSessions(allData);
  }, []);

  const filteredSessions = sessions
    .filter((session) => {
      if (activeTab === "All") return true;
      if (activeTab === "Upcoming") return session.status === "In Progress";
      if (activeTab === "Past") return session.status === "Completed";
      if (activeTab === "Recorded") return session.status === "Recorded";
      return false;
    })
    .filter((session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
  <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

    {/* Breadcrumb */}
    <div className="text-xs md:text-sm text-gray-500 mb-2">
      Dashboard › React Course ›{" "}
      <span className="text-red-600 font-medium">{activeTab}</span>
    </div>

    {/* Header */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <h1 className="text-xl md:text-2xl font-bold font-serif">
        Course Content
      </h1>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>

    {/* Tabs */}
    <div className="flex overflow-x-auto md:overflow-visible gap-3 rounded-xl mb-6 bg-[#F2F2F2] p-2 w-full md:w-auto">
      {["All", "Upcoming", "Past", "Recorded"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm transition ${
            activeTab === tab
              ? "bg-white text-red-600 font-medium shadow"
              : "text-gray-600 hover:bg-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Session List */}
    <div className="space-y-4">
      {filteredSessions.length > 0 ? (
        filteredSessions.map((session) => (
          <div
            key={session.id}
            onClick={() =>
              navigate(`/course/${courseName}/session/${session.id}`)
            }
            className="bg-white p-4 border-b border-[#DCDCDC] flex flex-col md:flex-row md:justify-between md:items-center gap-4 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="space-y-2">
              <h2 className="font-bold text-gray-800 text-sm md:text-base">
                {session.title}
              </h2>

              <div className="flex items-center gap-3">
                <img
                  src={new URL(`./data/${session.image}`, import.meta.url).href}
                  alt={session.title}
                  className="w-10 h-10 object-cover rounded-full"
                />

                <p className="text-xs md:text-sm text-gray-500">
                  {session.mentor} | {session.date}
                  {session.duration && ` | ${session.duration}`}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="self-start md:self-auto">
              {session.status === "Live" && (
                <button className="bg-[#B11C20] text-white px-4 py-2 rounded-lg text-sm">
                  Join Session
                </button>
              )}

              {["Completed", "Recorded"].includes(session.status) && (
                <button className="bg-[#2360BB] text-white px-4 py-2 rounded-lg text-sm">
                  View Recording
                </button>
              )}

              {session.status === "In Progress" && (
                <button className="bg-[#EBEBEB] text-gray-600 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                  Releasing Soon
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No sessions found.</p>
      )}
    </div>
  </div>
);
}