import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createTicket } from "../utils/ticketsApi";

export default function CreateTicket() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    course: "",
    category: "",
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.course || !form.category || !form.title || !form.description) {
      setError("Please fill all required fields before submitting.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await createTicket({
        course: form.course,
        category: form.category,
        title: form.title.trim(),
        description: form.description.trim(),
        file: selectedFile || undefined,
      });
      navigate("/support", { state: { created: true } });
    } catch (e) {
      setError(e.response?.data?.message || "Could not create ticket. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <Link to="/support" className="hover:text-blue-600 transition-colors cursor-pointer">
          Support / Help
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Create Ticket</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Create Support Ticket</h1>
        <p className="text-slate-600 mt-1">
          Describe your issue clearly so our team can resolve it quickly.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-6 space-y-5 max-w-4xl"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              value={form.course}
              onChange={(event) => handleInputChange("course", event.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Select course</option>
              <option value="React">React</option>
              <option value="DSA">DSA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(event) => handleInputChange("category", event.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Select category</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Assignment">Assignment</option>
              <option value="Session">Session</option>
              <option value="Payment">Payment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Issue Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleInputChange("title", event.target.value)}
            placeholder="Enter a short title for your issue"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Issue Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="6"
            value={form.description}
            onChange={(event) => handleInputChange("description", event.target.value)}
            placeholder="Describe the issue in detail so we can assist you better"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-2">
            Attach File (Optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-slate-200 rounded-xl p-6 bg-white flex flex-col items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <Upload size={20} className="mb-2" />
            <span className="text-sm font-medium">
              {selectedFile ? "Change Attachment" : "Upload Document"}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {selectedFile ? selectedFile.name : "pdf, png, jpg, zip, docx"}
            </span>
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/support")}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
