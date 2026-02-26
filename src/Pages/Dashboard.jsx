import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import SessionCard from "../components/SessionCard";
import AssignmentCard from "../components/AssignmentCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 overflow-y-auto">

      {/* Greeting */}
      <div className="bg-red-50 p-6 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-red-600">
            Good Evening ! Priyanka
          </h2>

          <p className="text-gray-600 mt-1">
            Continue your learning journey and stay consistent today.
          </p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="w-24"
          alt="profile"
        />
      </div>

      {/* Courses */}
      <h3 className="mt-6 mb-3 font-semibold">
        Ongoing Courses
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-72">
        <CourseCard
          title="React Development"
          mentor="Vikash Dubey"
          duration="4 Months"
        />

        <CourseCard
          title="Data Structures & Algorithms (DSA)"
          mentor="Amit Vaghamshi"
          duration="3 Months"
        />
      </div>

      {/* Progress */}
      <h3 className="mt-6 mb-3 font-semibold">
        Overall Progress (Course-Wise)
      </h3>

      <div className="flex bg-white p-4 rounded-xl">
        <ProgressBar title="React Development" progress="65%" />
        <ProgressBar title="DSA" progress="50%" />
      </div>

      {/* Sessions */}
      <h3 className="mt-6 mb-3 font-semibold">
        Today's Live Sessions
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <SessionCard title="React - State Management with Hooks" />
        <SessionCard title="React - Reusable Components & Props" />
        <SessionCard title="DSA - Arrays and Strings" />
      </div>

      {/* Pending Assignments */}
      <div className="flex justify-between items-center mt-6 mb-3">
        <h3 className="font-semibold">
          Pending Assignments
        </h3>

        <button
          onClick={() => navigate("/pending-assignments")}
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* 3 Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AssignmentCard
          title="Build Todo App"
          status="Pending"
        />

        <AssignmentCard
          title="Arrays & Strings"
          status="Not Completed"
        />

        <AssignmentCard
          title="Counter App using useState"
          status="Pending"
        />
      </div>

    </div>
  );
}
