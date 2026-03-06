import { Download } from "lucide-react";
import certificateImg  from "./MyCourses/data/certificates.png";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      course: "React Course",
      image: certificateImg,
      pdf: "/certificates/react-cert.pdf",
    },
    {
      id: 2,
      course: "Data Structures and Algorithms (DSA)",
      image: certificateImg,
      pdf: "/certificates/dsa-cert.pdf",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Dashboard ›{" "}
        <span className="text-red-600 font-medium">
          Certificates
        </span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 font-serif">
        Certificates
      </h1>

      <p className="text-gray-600 mb-10">
        Celebrate your achievements. Download and share your course completion certificates.
      </p>

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 gap-10">

        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
          >
            {/* Certificate Image */}
            <img
              src={cert.image}
              alt={cert.course}
              className="w-full h-[260px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-end justify-between px-6 py-4 opacity-0 group-hover:opacity-100 transition duration-300">

              <button className="text-white underline text-sm">
                View Certificate
              </button>

              <a
                href={cert.pdf}
                download
                className="flex items-center gap-2 text-white text-sm"
              >
                <Download size={16} />
                Download PDF
              </a>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}