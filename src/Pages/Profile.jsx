import { User } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Profile</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-10">
        Profile
      </h1>

      {/* Content Container (Left Side Aligned) */}
      <div className="w-full max-w-3xl ml-10">

        {/* Avatar */}
        <div className="flex justify-center mb-10">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={48} className="text-gray-500" />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-8 text-gray-700">

          {/* Name */}
          <div className="border-b pb-3">
            <p className="text-base">Priyanka</p>
          </div>

          {/* Email */}
          <div className="border-b pb-3">
            <p className="text-base">priyanka2300@gmail.com</p>
          </div>

          {/* Phone */}
          <div className="border-b pb-3">
            <p className="text-base">+91 9823478093</p>
          </div>

        </div>

      </div>

    </div>
  );
}
