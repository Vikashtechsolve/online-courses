import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Monitor,
  Gauge,
  BookOpen,
  Users,
  SendHorizontal,
  Loader2,
  Video,
  Download,
  ExternalLink,
} from "lucide-react";
import DOMPurify from "dompurify";
import {
  getLectureById,
  getDiscussions,
  createDiscussion,
} from "../../utils/lecturesApi";
import HLSVideoPlayer from "../../components/HLSVideoPlayer";
import { getUser } from "../../utils/auth";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionDetails() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [lecture, setLecture] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Practice");
  const [discussionInput, setDiscussionInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const discussionEndRef = useRef(null);

  useEffect(() => {
    loadLecture();
  }, [lectureId]);

  useEffect(() => {
    loadDiscussions();
  }, [lectureId, activeTab === "Discussions"]);

  // Redirect students to course content if lecture hasn't started yet
  useEffect(() => {
    if (!lecture || loading) return;
    const beforeStart =
      lecture.scheduledAt && new Date() < new Date(lecture.scheduledAt);
    if (beforeStart) {
      navigate(`/course/${courseId}`, { replace: true });
    }
  }, [lecture, loading, courseId, navigate]);

  useEffect(() => {
    discussionEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discussions]);

  const loadLecture = async () => {
    setLoading(true);
    try {
      const data = await getLectureById(lectureId);
      setLecture(data);
    } catch {
      setLecture(null);
    } finally {
      setLoading(false);
    }
  };

  const loadDiscussions = async () => {
    if (activeTab !== "Discussions") return;
    try {
      const list = await getDiscussions(lectureId);
      setDiscussions(list || []);
    } catch {
      setDiscussions([]);
    }
  };

  const handleSendMessage = async () => {
    const text = discussionInput.trim();
    if (!text || sendingMessage) return;

    setSendingMessage(true);
    try {
      const newMsg = await createDiscussion(lectureId, text);
      setDiscussions((prev) => [...prev, newMsg]);
      setDiscussionInput("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading && !lecture) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <p className="text-slate-600">Lecture not found.</p>
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="text-blue-600 hover:underline mt-2"
        >
          Back to Course
        </button>
      </div>
    );
  }

  const course = lecture.course;
  const notes = lecture.notes || {};
  const isBeforeStart =
    lecture.scheduledAt && new Date() < new Date(lecture.scheduledAt);
  const hasMeetingLink = !!lecture.meetingLink;

  if (isBeforeStart) return null; // Redirect handled in useEffect

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-50 min-h-full space-y-6">
      <div className="text-sm flex items-center gap-2 text-slate-500">
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          Dashboard
        </Link>
        <span>/</span>
        <Link to="/mycourses" className="hover:text-blue-600 transition-colors cursor-pointer">
          My Courses
        </Link>
        <span>/</span>
        <Link
          to={`/course/${courseId}`}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          {course?.title || "Course"}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-700">{lecture.title}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{lecture.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-slate-500 mt-3 text-sm">
          <span>{lecture.teacher?.name || "Teacher"}</span>
          <span>•</span>
          {lecture.scheduledAt && (
            <>
              <span>{formatDate(lecture.scheduledAt)}</span>
              <span>•</span>
            </>
          )}
          {lecture.duration && <span>{lecture.duration} min</span>}
          <span>•</span>
          <span className="capitalize">{lecture.status}</span>
        </div>

        {hasMeetingLink && (
          <a
            href={lecture.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isBeforeStart
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
            }`}
          >
            {isBeforeStart ? "Join Session" : "Join Live"}
          </a>
        )}
      </div>

      {/* Video Section */}
      {lecture.videoUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-3 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Video size={20} className="text-blue-600" />
            <h2 className="font-semibold text-slate-900">Lecture Video</h2>
          </div>
          <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
            <HLSVideoPlayer
              src={lecture.videoUrl}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Practice", icon: <BookOpen size={16} /> },
            { name: "Notes", icon: <FileText size={16} /> },
            { name: "Slides", icon: <Monitor size={16} /> },
            { name: "Test", icon: <Gauge size={16} /> },
            { name: "Discussions", icon: <Users size={16} /> },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition cursor-pointer ${
                activeTab === tab.name
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        {activeTab === "Notes" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Notes</h2>
            {notes.pdf ? (
              <a
                href={notes.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <FileText size={16} />
                Download PDF
              </a>
            ) : (
              <p className="text-slate-500">No notes available for this lecture.</p>
            )}
          </div>
        )}

        {activeTab === "Slides" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Slides (PPT)</h2>
            {lecture.ppt?.fileUrl ? (
              <a
                href={lecture.ppt.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                <Download size={18} />
                Download PPT
              </a>
            ) : (
              <p className="text-slate-500">No PPT file uploaded for this lecture.</p>
            )}
          </div>
        )}

        {activeTab === "Test" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Test Link</h2>
            {lecture.testLink ? (
              <a
                href={lecture.testLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <ExternalLink size={18} />
                Open Test (opens in new tab)
              </a>
            ) : (
              <p className="text-slate-500">No test link available.</p>
            )}
          </div>
        )}

        {activeTab === "Practice" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">Practice Exercises</h2>
            {lecture.practiceContent ? (
              <div
                className="practice-content p-6 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm min-h-[200px]"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(lecture.practiceContent, {
                    ALLOWED_TAGS: [
                      "p", "br", "strong", "b", "em", "i", "u",
                      "ul", "ol", "li", "h1", "h2", "h3", "h4",
                      "a", "code", "pre", "blockquote", "hr", "span", "div",
                    ],
                    ALLOWED_ATTR: ["href", "target", "rel"],
                  }),
                }}
              />
            ) : (
              <p className="text-slate-500">No practice content available.</p>
            )}
          </div>
        )}

        {activeTab === "Discussions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-900">Discussions</h2>
              <p className="text-xs text-slate-500">{discussions.length} messages</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 space-y-3 max-h-[420px] overflow-y-auto">
              {discussions.map((d) => {
                const isMine = d.user?._id === user?._id;
                return (
                  <div
                    key={d._id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                        isMine
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p
                          className={`text-xs font-semibold ${
                            isMine ? "text-blue-100" : "text-slate-500"
                          }`}
                        >
                          {d.user?.name || "User"}
                        </p>
                        <p
                          className={`text-[11px] ${
                            isMine ? "text-blue-100" : "text-slate-400"
                          }`}
                        >
                          {formatDate(d.createdAt)}
                        </p>
                      </div>
                      <p
                        className={`text-sm mt-1 leading-relaxed ${
                          isMine ? "text-white" : "text-slate-700"
                        }`}
                      >
                        {d.text}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={discussionEndRef} />
            </div>

            <div className="flex items-end gap-2">
              <textarea
                rows="2"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Write a message..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={sendingMessage || !discussionInput.trim()}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sendingMessage ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <SendHorizontal size={15} />
                )}
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
