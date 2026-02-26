import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allData from "./data/reactCourseAll.json";

export default function CourseContent() {
  const { courseName } = useParams();

  const [activeTab, setActiveTab] = useState("All");
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSessions(allData);
  }, []);

  // ✅ Combined Filtering (Tab + Search)
  const filteredSessions = sessions
    .filter((session) => {
      if (activeTab === "All") return true;

      if (activeTab === "Upcoming")
        return session.status === "In Progress";

      if (activeTab === "Past")
        return session.status === "Completed";

      if (activeTab === "Recorded")
        return session.status === "Recorded";

      return false;
    })
    .filter((session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        Dashboard › React Course ›{" "}
        <span className="text-red-600 font-medium">{activeTab}</span>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Course Content
        </h1>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["All", "Upcoming", "Past", "Recorded"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              activeTab === tab
                ? "bg-red-100 text-red-600 font-medium"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
              className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-gray-800">
                  {session.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {session.mentor} | {session.date}
                  {session.duration && ` | ${session.duration}`}
                </p>
              </div>

              {session.status === "Live" && (
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                  Join Session
                </button>
              )}

              {session.status === "Completed" && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  View Recording
                </button>
              )}

              {session.status === "Recorded" && (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  View Recording
                </button>
              )}

              {session.status === "In Progress" && (
                <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                  Releasing Soon
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No sessions found.
          </p>
        )}
      </div>

    </div>
  );
}