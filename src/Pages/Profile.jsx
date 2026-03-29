import { useState, useEffect, useRef } from "react";
import { Mail, Phone, ShieldCheck, User, Camera, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getUser, fetchProfile, updateProfile, uploadAvatar, changePassword } from "../utils/auth";

export default function Profile() {
  const [profile, setProfile] = useState(getUser());
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile()
      .then((user) => setProfile(user))
      .catch(() => {});
  }, []);

  const handleEdit = () => {
    setEditName(profile?.name || "");
    setEditPhone(profile?.phone || "");
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await updateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
      });
      setProfile(updated);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const avatarUrl = await uploadAvatar(file);
      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
      setMessage({ type: "success", text: "Avatar updated." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to upload avatar.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setMessage({ type: "success", text: "Password changed successfully." });
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to change password.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

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
        <span className="font-medium text-slate-700">Profile</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-600 mt-1">
          View and manage your personal details and account.
        </p>
      </div>

      {message.text && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white shadow"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                  <User size={34} className="text-slate-500" />
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center shadow hover:bg-violet-700 cursor-pointer disabled:opacity-60"
              >
                {isUploading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Camera size={14} />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-xl font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-violet-400"
                />
              ) : (
                <h2 className="text-xl font-semibold text-slate-900">
                  {profile?.name || "Student"}
                </h2>
              )}
              <p className="text-sm text-slate-600 capitalize">
                {profile?.role || "Student"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">Member Since</p>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {memberSince}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">Status</p>
              <p className="text-sm font-medium text-emerald-700 mt-1">Active</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1">Full Name</p>
            <p className="text-sm font-medium text-slate-800">
              {profile?.name || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <Mail size={14} />
              Email Address
            </p>
            <p className="text-sm font-medium text-slate-800 break-all">
              {profile?.email || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <Phone size={14} />
              Phone Number
            </p>
            {isEditing ? (
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none w-full focus:border-violet-400"
              />
            ) : (
              <p className="text-sm font-medium text-slate-800">
                {profile?.phone || "—"}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-2">
              <ShieldCheck size={14} />
              Role
            </p>
            <p className="text-sm font-medium text-slate-800 capitalize">
              {profile?.role || "Student"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center gap-2"
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setShowPasswordForm(!showPasswordForm);
                  setMessage({ type: "", text: "" });
                }}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Change Password
              </button>
            </>
          )}
        </div>
      </div>

      {showPasswordForm && (
        <form
          onSubmit={handleChangePassword}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 max-w-4xl space-y-4"
        >
          <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center gap-2"
            >
              {isChangingPassword && <Loader2 size={14} className="animate-spin" />}
              {isChangingPassword ? "Changing..." : "Update Password"}
            </button>
            <button
              type="button"
              onClick={() => setShowPasswordForm(false)}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
