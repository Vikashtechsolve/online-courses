import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/login"); 
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        Dashboard <span className="mx-1">›</span>
        <span className="text-red-600 font-medium">Logout</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-12">
        Logout
      </h1>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center mt-10">

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Are You Sure You Want to Log Out?
        </h2>

        <p className="text-gray-500 text-sm mb-8 text-center">
          You’ll be logged out of your Dashboard and will need to sign in again to continue.
        </p>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-4">

          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition"
          >
            Yes
          </button>

          <button
            onClick={handleCancel}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}
