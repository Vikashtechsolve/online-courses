import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut, ShieldAlert } from "lucide-react";
import { logoutUser } from "../utils/auth";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    navigate("/dashboard");
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
        <span className="font-medium text-slate-700">Logout</span>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50/60 shadow-sm p-6 max-w-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-red-200 inline-flex items-center justify-center">
            <ShieldAlert className="text-red-600" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Logout</h1>
            <p className="text-slate-600 mt-1">
              Are you sure you want to log out? You will need to sign in again
              to continue.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-colors cursor-pointer font-medium"
          >
            <LogOut size={16} />
            Yes, Logout
          </button>

          <button
            onClick={handleCancel}
            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl transition-colors cursor-pointer font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
