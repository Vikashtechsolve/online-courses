import api from "./api";

const TOKEN_KEY = "student_token";
const USER_KEY = "student_user";

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function loginUser(email, password) {
  const { data } = await api.post("/auth/login", { email, password });

  if (data.user.role !== "student") {
    throw new Error("This portal is for students only. Please use the admin panel.");
  }

  setAuth(data.token, data.user);
  return data;
}

export async function forgotPassword(email) {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
}

export async function resetPassword(token, newPassword) {
  const { data } = await api.post("/auth/reset-password", { token, newPassword });
  setAuth(data.token, data.user);
  return data;
}

export async function fetchProfile() {
  const { data } = await api.get("/auth/me");
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export async function updateProfile(updates) {
  const { data } = await api.put("/auth/profile", updates);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export async function changePassword(currentPassword, newPassword) {
  const { data } = await api.put("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  return data;
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await api.post("/users/upload-avatar", formData);
  const user = getUser();
  if (user) {
    user.avatar = data.avatar;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  return data.avatar;
}
