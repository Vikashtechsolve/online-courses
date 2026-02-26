import { ChevronDown } from "lucide-react";

export default function Assignments() {
  const assignments = [
    {
      title: "Build a Todo Application using React",
      course: "React",
      due: "29 January, 2026",
      assigned: "20 January, 2026",
      time: "3-4 Hours",
      status: "Not Completed",
    },
    {
      title: "Solve Array & String Problems (Set–1)",
      course: "Data Structures & Algorithms",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2 Hours",
      status: "Pending",
    },
    {
      title: "Build Reusable UI Components",
      course: "React",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2-3 Hours",
      status: "Pending",
    },
    {
      title: "Recursion Basics – Problem Set",
      course: "DSA",
      due: "1 February, 2026",
      assigned: "25 January, 2026",
      time: "2-3 Hours",
      status: "Pending",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Not Completed")
      return "bg-red-100 text-red-600";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Assignments</span>
      </div>

      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <h1 className="text-2xl font-bold text-gray-800">
          Assignments
        </h1>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm bg-white hover:bg-gray-100">
            Select Course
            <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm bg-white hover:bg-gray-100">
            Select Status
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {assignments.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* Title */}
            <h2 className="text-red-600 font-semibold text-lg mb-4">
              {item.title}
            </h2>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">

              <p>
                <span className="font-medium text-gray-700">
                  Course:
                </span>{" "}
                {item.course}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Due Date:
                </span>{" "}
                {item.due}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Assigned On:
                </span>{" "}
                {item.assigned}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Estimated Time:
                </span>{" "}
                {item.time}
              </p>

              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  Status:
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </p>
            </div>

            {/* Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition">
              Submit Assignment
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}
