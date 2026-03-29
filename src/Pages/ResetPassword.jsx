import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LockKeyhole, Loader2 } from "lucide-react";
import logo from "../assets/logo.png";
import { resetPassword } from "../utils/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50/60 shadow-sm p-6 text-center">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Invalid Link</h1>
          <p className="text-sm text-slate-600 mb-4">
            This password reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="text-sm text-violet-600 hover:text-violet-700 font-medium"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed. The link may have expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-6">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="VTS Logo" className="h-20 w-auto object-contain" />
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Reset Password
          </h1>
          <p className="text-sm text-slate-600 mt-1 text-center">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">New Password</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <LockKeyhole size={16} className="text-slate-500" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-slate-700"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <LockKeyhole size={16} className="text-slate-500" />
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-slate-700"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl transition-colors font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm text-violet-600 hover:text-violet-700 font-medium cursor-pointer"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
