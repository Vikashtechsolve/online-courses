import { Megaphone } from "lucide-react";

export default function Announcements() {
  const announcements = [
    {
      title: "Live Session Timings Update (React)",
      description:
        "The live session on State Management with Hooks scheduled for 24 Jan 2026 will now start at 7:30 PM instead of 7:00 PM. Please make sure to join on time.",
      date: "22 January, 2026",
    },
    {
      title: "DSA Live Class Rescheduled",
      description:
        "The live session on Arrays & Strings – Problem Solving has been rescheduled from 23 Jan 2026 to 25 Jan 2026 due to mentor unavailability.",
      date: "21 January, 2026",
    },
    {
      title: "New Practice Set Added – React Forms",
      description:
        "A new practice set on Form Handling & Validation has been added under the Practice section. Students are encouraged to complete it before the next live session.",
      date: "20 January, 2026",
    },
    {
      title: "Weekly DSA Test Scheduled",
      description:
        "The Weekly DSA Test (Arrays & Strings) will be conducted on 26 Jan 2026 at 8:00 PM. The test duration will be 60 minutes.",
      date: "20 January, 2026",
    },
    {
      title: "Recording Available for React Live Session",
      description:
        "The recording for the live session Building Reusable Components & Props is now available under the Course Content section.",
      date: "19 January, 2026",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Announcements</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Announcements
      </h1>

      <p className="text-gray-600 mb-6">
        Stay updated with the latest course-related announcements and important notices.
      </p>

      {/* Announcement List */}
      <div className="space-y-5">

        {announcements.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Title */}
            <div className="flex items-start gap-3 mb-3">
              <Megaphone className="text-blue-500 mt-1" size={20} />
              <h3 className="text-red-600 font-semibold text-lg">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-500">
              Date Posted: {item.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

