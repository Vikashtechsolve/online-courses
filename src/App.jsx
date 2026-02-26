import Sidebar from "./components/sidebar";

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
import PendingAssignments from "./Pages/PendingAssignment"; 
import Topbar from "./components/Topbar";
import CourseContent from "./Pages/MyCourses/CourseContent";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/livesessions" element={<LiveSessions />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/support/create-ticket" element={<CreateTicket />} />
            <Route path="/pending-assignments" element={<PendingAssignments />} />
            <Route path="/course/:courseName" element={<CourseContent />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

