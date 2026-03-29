import { useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./Pages/Dashboard";
import MyCourses from "./Pages/MyCourse";
import LiveSessions from "./Pages/LiveSession";
import Assignments from "./Pages/Assignments";
import Certificates from "./Pages/Certificates";
import Announcements from "./Pages/Announcements";
import Support from "./Pages/Support";
import Profile from "./Pages/Profile";
import Logout from "./Pages/Logout";
import CreateTicket from "./Pages/CreateTicket";
import SupportTicketDetails from "./Pages/SupportTicketDetails";
import PendingAssignments from "./Pages/PendingAssignment";
import CourseContent from "./Pages/MyCourses/CourseContent";
import SessionDetails from "./Pages/MyCourses/SessionDetails";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

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
        </div>
      </div>
    </div>
  );
}
