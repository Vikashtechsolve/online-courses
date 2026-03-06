import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const courses = [
    {
      title: "React Development",
      level: "Beginner to Advanced",
      mentor: "Vikash Dubey",
      duration: "4 Months",
      mode: "Recorded + Live Sessions",
    },
    {
      title: "Data Structures & Algorithms DSA",
      level: "Beginner to Advanced",
      mentor: "Rahul Verma",
      duration: "3 Months",
      mode: "Recorded + Live Sessions + Practice Based",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">My Courses</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-1">My Courses</h1>

      <p className="text-gray-500 mb-6">
        Track your enrolled courses and continue learning at your own pace.
      </p>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-[#EAF2FF] shadow-sm  p-5 hover:shadow-md transition"
          >
            {/* Title */}
            <h2 className="text-red-600 font-semibold text-lg mb-3">
              {course.title}
            </h2>

            {/* Details */}
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>
                <span className="font-medium text-gray-700">Level:</span>{" "}
                {course.level}
              </p>

              <p>
                <span className="font-medium text-gray-700">Mentor:</span>{" "}
                {course.mentor}
              </p>

              <p>
                <span className="font-medium text-gray-700">
                  Course Duration:
                </span>{" "}
                {course.duration}
              </p>

              <p>
                <span className="font-medium text-gray-700">Mode:</span>{" "}
                {course.mode}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate("/course/react-development")}
              className="flex items-center gap-2 bg-[#2360BB] hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              View Course Details
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
