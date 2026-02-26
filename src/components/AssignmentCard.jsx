import { useState } from "react";
import AssignmentSubmissionModal from "../Pages/AssignmentSubmissionModal";

export default function AssignmentCard({ title, status }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="bg-[#2360BB0F] rounded-xl p-5 shadow-sm">

        <h3 className="text-red-600 font-semibold text-lg mb-3">
          {title}
        </h3>

        <p className="text-sm mb-4">
          Status:
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </p>

        <button
          onClick={() => setShowModal(true)}  
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Submit Assignment
        </button>

      </div>

      {/* Modal */}
      {showModal && (
        <AssignmentSubmissionModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
