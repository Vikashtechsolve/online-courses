import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-full">

      {/* Breadcrumb */}
      <div className="text-xs md:text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Profile</span>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 md:mb-10">
        Profile
      </h1>

      {/* Content Container */}
      <div className="w-full max-w-3xl md:ml-10">

        {/* Avatar */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={40} className="text-gray-500 md:w-12 md:h-12" />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-6 md:space-y-8 text-gray-700">

          {/* Name */}
          <div className="border-b pb-3">
            <p className="text-sm md:text-base">Priyanka</p>
          </div>

          {/* Email */}
          <div className="border-b pb-3 break-words">
            <p className="text-sm md:text-base">
              priyanka2300@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div className="border-b pb-3">
            <p className="text-sm md:text-base">
              +91 9823478093
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}