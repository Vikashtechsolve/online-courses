import { useNavigate } from "react-router-dom";
import AssignmentCard from "../components/AssignmentCard";
import { ArrowLeft } from "lucide-react";

export default function PendingAssignments() {
  const navigate = useNavigate();

  const assignments = [
    {
      title: "Build Todo App",
      status: "Pending",
    },
    {
      title: "Arrays & Strings",
      status: "Not Completed",
    },
    {
      title: "Counter App using useState",
      status: "Pending",
    },
    {
      title: "Component & JSX Basics",
      status: "Not Completed",
    },
    {
      title: "Strings & Patterns",
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">
          Pending Assignments
        </span>
      </div>

      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <h1 className="text-xl font-semibold">
          Pending Assignments
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assignments.map((item, index) => (
          <AssignmentCard
            key={index}
            title={item.title}
            status={item.status}
          />
        ))}
      </div>

    </div>
  );
}
