import { lazy, Suspense, useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/Topbar";
import { Loader2 } from "lucide-react";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const MyCourses = lazy(() => import("./Pages/MyCourse"));
const LiveSessions = lazy(() => import("./Pages/LiveSession"));
const Assignments = lazy(() => import("./Pages/Assignments"));
const Certificates = lazy(() => import("./Pages/Certificates"));
const Announcements = lazy(() => import("./Pages/Announcements"));
const Support = lazy(() => import("./Pages/Support"));
const Profile = lazy(() => import("./Pages/Profile"));
const Logout = lazy(() => import("./Pages/Logout"));
const CreateTicket = lazy(() => import("./Pages/CreateTicket"));
const SupportTicketDetails = lazy(() => import("./Pages/SupportTicketDetails"));
const PendingAssignments = lazy(() => import("./Pages/PendingAssignment"));
const CourseContent = lazy(() => import("./Pages/MyCourses/CourseContent"));
const SessionDetails = lazy(() => import("./Pages/MyCourses/SessionDetails"));
const Login = lazy(() => import("./Pages/Login"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[40vh]">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );
}

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password"];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthRoute = AUTH_PATHS.includes(location.pathname);
  const loggedIn = isAuthenticated();

  return (
    <div className={`flex ${isAuthRoute ? "min-h-screen" : "h-screen overflow-hidden"}`}>
      {!isAuthRoute && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}

      <div className="flex-1 flex flex-col w-0">
        {!isAuthRoute && <Topbar setIsOpen={setIsOpen} />}

        <div
          className={`flex-1 ${isAuthRoute ? "" : "p-4 md:p-6 overflow-y-auto overflow-x-hidden"}`}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/login"
                element={loggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
              />
              <Route
                path="/forgot-password"
                element={
                  loggedIn ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
                }
              />
              <Route
                path="/reset-password"
                element={
                  loggedIn ? <Navigate to="/dashboard" replace /> : <ResetPassword />
                }
              />

              <Route
                path="/"
                element={loggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
              />

              <Route
                path="/dashboard"
                element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/mycourses"
                element={loggedIn ? <MyCourses /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/livesessions"
                element={loggedIn ? <LiveSessions /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/assignments"
                element={loggedIn ? <Assignments /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/certificates"
                element={loggedIn ? <Certificates /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/announcements"
                element={loggedIn ? <Announcements /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/support"
                element={loggedIn ? <Support /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/profile"
                element={loggedIn ? <Profile /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/logout"
                element={loggedIn ? <Logout /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/support/create-ticket"
                element={loggedIn ? <CreateTicket /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/support/ticket/:ticketId"
                element={
                  loggedIn ? <SupportTicketDetails /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/pending-assignments"
                element={loggedIn ? <PendingAssignments /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/course/:courseId"
                element={loggedIn ? <CourseContent /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/course/:courseId/session/:lectureId"
                element={loggedIn ? <SessionDetails /> : <Navigate to="/login" replace />}
              />
              <Route path="*" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
