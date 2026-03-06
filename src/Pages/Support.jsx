import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Support() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Unresolved");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Support/Help</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Support/Help
        </h1>

        <button
          onClick={() => navigate("/support/create-ticket")}
          className="bg-[#2360BB] hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition"
        >
          CREATE TICKET
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 rounded-xl p-1 inline-flex">
        <button
          onClick={() => setActiveTab("Unresolved")}
          className={`px-6 py-2 text-sm rounded-lg transition ${
            activeTab === "Unresolved"
              ? "bg-white text-red-600 font-medium shadow"
              : "text-gray-600"
          }`}
        >
          Unresolved
        </button>

        <button
          onClick={() => setActiveTab("Resolved")}
          className={`px-6 py-2 text-sm rounded-lg transition ${
            activeTab === "Resolved"
              ? "bg-white text-red-600 font-medium shadow"
              : "text-gray-600"
          }`}
        >
          Resolved
        </button>
      </div>
    </div>
  );
}
