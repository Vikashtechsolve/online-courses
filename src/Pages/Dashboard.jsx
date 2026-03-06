import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import SessionCard from "../components/SessionCard";
import AssignmentCard from "../components/AssignmentCard";
import { useNavigate } from "react-router-dom";
import home from "./MyCourses/data/home.png";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 overflow-y-auto">

      {/* Greeting */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        
          <div className="bg-red-50 w-full md:w-1/2 p-5 md:p-6 rounded-xl flex flex-col justify-center">
            <h2 className="text-lg md:text-xl font-semibold text-red-600">
              Good Evening ! Priyanka
            </h2>

            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Continue your learning journey and stay consistent today.
            </p>
          </div>

        <img
          src={home}
          className="w-32 md:w-40 object-contain"
          alt="profile"
        />
      </div>

      {/* Courses */}
      <h3 className="mt-6 mb-3 font-semibold">
        Ongoing Courses
      </h3>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
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

      <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl">
        <ProgressBar title="React Development" progress="65%"  />
        <ProgressBar title="DSA" progress="50%" />
      </div>

      {/* Sessions */}
      <h3 className="mt-6 mb-3 font-semibold">
        Today's Live Sessions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SessionCard
          title="React - State Management with Hooks"
          date="24th January,2026"
          Time="10:00 AM - 11:00 AM"
          mentor="Vikash Dubey"
        />

        <SessionCard
          title="React - Reusable Components & Props"
          date="24th January,2026"
          Time="11:30 AM - 12:30 PM"
          mentor="Vikash Dubey"
        />

        <SessionCard
          title="DSA - Arrays and Strings"
          date="24th January,2026"
          Time="2:00 PM - 3:00 PM"
          mentor="Amit Vaghamshi"
        />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AssignmentCard
          title="Build Todo App"
          status="Pending"
          Duedate="24th January,2026"
          course="React"
        />

        <AssignmentCard
          title="Arrays & Strings"
          status="Not Completed"
          Duedate="24th January,2026"
          course="DSA"
        />

        <AssignmentCard
          title="Counter App using useState"
          status="Pending"
          Duedate="24th January,2026"
          course="React"
        />
      </div>

    </div>
  );
}