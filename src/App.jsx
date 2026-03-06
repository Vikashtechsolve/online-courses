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
import PendingAssignments from "./Pages/PendingAssignment";
import CourseContent from "./Pages/MyCourses/CourseContent";
import SessionDetails from "./Pages/MyCourses/SessionDetails";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col w-0">
        <Topbar setIsOpen={setIsOpen} />

        <div className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />

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
            <Route
              path="/pending-assignments"
              element={<PendingAssignments />}
            />
            <Route path="/course/:courseName" element={<CourseContent />} />
            <Route
              path="/course/:courseName/session/:id"
              element={<SessionDetails />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
