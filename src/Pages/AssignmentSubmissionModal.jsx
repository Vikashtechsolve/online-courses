import { X, Upload, Plus } from "lucide-react";

export default function AssignmentSubmissionModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center text-red-600">
          Assignment Submission
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Upload your work or share the project link for review
        </p>

        {/* Form */}
        <div className="space-y-5">

          {/* Submission Type */}
          <div>
            <label className="text-sm font-medium">
              Choose Submission Type <span className="text-red-500">*</span>
            </label>

            <select className="w-full mt-2 border rounded-xl px-4 py-3 bg-gray-50">
              <option>Enter your Assignment Title</option>
              <option>File Upload</option>
              <option>Project Link</option>
            </select>
          </div>

          {/* Upload File */}
          <div>
            <label className="text-sm font-medium">
              Upload File <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 border rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
              <Upload size={20} className="mb-2" />
              Upload File
              <p className="text-xs mt-1">
                Supported formats: zip, pdf, docx
              </p>
            </div>
          </div>

          {/* OR */}
          <div className="text-center text-gray-400 text-sm">
            or
          </div>

          {/* Project Link */}
          <div>
            <label className="text-sm font-medium">
              Project/Code Link <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 border rounded-xl p-4 flex items-center gap-2 bg-gray-50">
              <Plus size={16} />
              <input
                type="text"
                placeholder="Add Link"
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
