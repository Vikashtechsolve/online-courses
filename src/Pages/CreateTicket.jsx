import { ChevronDown, Upload } from "lucide-react";

export default function CreateTicket() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        Support/Help <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">
          Create Ticket
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Support/Help
      </h1>

      <p className="text-gray-600 mb-6">
        Need help? Find answers to common questions or raise a support ticket.
      </p>

      <h2 className="text-blue-600 font-semibold text-lg mb-6">
        Create a Support Ticket
      </h2>

      {/* Form */}
      <div className="space-y-6 max-w-3xl">

        {/* Course & Category */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Course
            </label>
            <button className="w-full flex justify-between items-center border rounded-xl px-4 py-3 bg-white">
              Select Course
              <ChevronDown size={16} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Choose the Category
            </label>
            <button className="w-full flex justify-between items-center border rounded-xl px-4 py-3 bg-white">
              Issue Category
              <ChevronDown size={16} />
            </button>
          </div>

        </div>

        {/* Issue Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Issue Title
          </label>
          <input
            type="text"
            placeholder="Enter the Issue Title"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Issue Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Issue Description
          </label>
          <textarea
            rows="5"
            placeholder="Describe the issue in detail so we can assist you better"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Attach File */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Attach File
          </label>

          <div className="border rounded-xl p-8 bg-white flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition">
            <Upload size={20} className="mb-2" />
            Upload Document
          </div>
        </div>

        {/* Submit Button */}
        <button className="bg-[#2360BB] hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg transition">
          Submit Ticket
        </button>

      </div>

    </div>
  );
}
