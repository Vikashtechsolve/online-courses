import { Video, Bell } from "lucide-react";

export default function LiveSessions() {
  const sessions = [
    {
      title: "State Management with Hooks",
      course: "React Development",
      mentor: "Vikash Dubey",
      date: "30 January, 2026",
      time: "1:00 PM - 2:00 PM",
      type: "Live ( Recording will be Available Soon )",
    },
    {
      title: "Arrays & Strings - Problem Solving",
      course: "Data Structures & Algorithms",
      mentor: "Vikash Dubey",
      date: "1 February, 2026",
      time: "3:00 PM - 5:00 PM",
      type: "Live + Practice",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Live Sessions</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Live Sessions
      </h1>

      {/* Subheading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Upcoming Sessions
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {sessions.map((session, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Title */}
            <h3 className="text-red-600 font-semibold text-lg mb-4">
              {session.title}
            </h3>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600 mb-6">

              <p>
                <span className="font-medium text-gray-700">
                  Course:
                </span>{" "}
                {session.course}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Mentor:
                </span>{" "}
                {session.mentor}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Date:
                </span>{" "}
                {session.date}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Time:
                </span>{" "}
                {session.time}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Session:
                </span>{" "}
                {session.type}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">

              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition">
                <Video size={16} />
                Join Session
              </button>

              <button className="flex items-center gap-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 text-sm px-4 py-2 rounded-lg transition">
                <Bell size={16} />
                Set Reminder
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
