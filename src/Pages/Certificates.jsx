import { useState, useEffect } from "react";
import { Download, Loader2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { getCertificates, downloadCertificate } from "../utils/certificatesApi";
import certificateImg from "./MyCourses/data/certificates.png";
import { formatDate } from "../utils/date";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const list = await getCertificates();
      setCertificates(list);
    } catch {
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (cert) => {
    if (downloadingId) return;
    setDownloadingId(cert._id);
    try {
      const blob = await downloadCertificate(cert._id);
      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${(cert.course?.title || "course").replace(/[^a-z0-9.-]/gi, "_")}-${cert.certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // error handled by api interceptor
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">Certificates</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Certificates
        </h1>
        <p className="text-slate-600 mt-1">
          Celebrate your achievements. Download and share your course completion
          certificates.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-500 text-sm">Loading certificates...</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
            <Award className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            No certificates yet
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
            Complete a course and have your teacher or admin mark it as complete to receive your certificate here.
          </p>
          <Link
            to="/mycourses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            View My Courses
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="group rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm hover:shadow-md transition-all overflow-hidden max-w-sm w-full"
            >
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Completion Certificate
                </p>
                <h3 className="text-slate-900 font-semibold mt-1 text-sm leading-5 min-h-10">
                  {cert.course?.title || "Course"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Issued {formatDate(cert.issuedAt)} • ID: {cert.certificateId}
                </p>
              </div>

              <div className="px-4 pb-4">
                <img
                  src={certificateImg}
                  alt={cert.course?.title}
                  className="w-full h-[185px] object-cover rounded-xl border border-slate-200"
                />
              </div>

              <div className="px-4 pb-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleDownload(cert)}
                  disabled={!!downloadingId}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {downloadingId === cert._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Download size={16} />
                  )}
                  {downloadingId === cert._id ? "Downloading..." : "Download PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
