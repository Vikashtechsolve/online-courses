import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import logo from "../assets/logo.png";
import { forgotPassword } from "../utils/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await forgotPassword(email.trim());
      setSuccessMessage(
        data.message || "If an account with that email exists, a reset link has been sent."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
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
            Forgot Password
          </h1>
          <p className="text-sm text-slate-600 mt-1 text-center">
            Enter your email to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <Mail size={16} className="text-slate-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

          {successMessage && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-xl transition-colors font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? "Sending..." : "Send Reset Link"}
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
