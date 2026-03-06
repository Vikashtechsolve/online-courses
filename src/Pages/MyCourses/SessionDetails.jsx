import { useParams } from "react-router-dom";
import { useState } from "react";
import allData from "./data/reactCourseAll.json";
import sessionData from "./data/component.png"
import {
  FileText,
  Monitor,
  Gauge,
  BookOpen,
  Users,
} from "lucide-react";

export default function SessionDetails() {
  const { id } = useParams();
  const session = allData.find((item) => item.id === Number(id));
  const [activeTab, setActiveTab] = useState("Notes");

  if (!session) return <div>Session Not Found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Dashboard › React Course ›{" "}
        <span className="text-red-600 font-medium">
          {session.title}
        </span>
      </div>

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {session.title}
        </h1>

        <div className="flex items-center gap-3 text-gray-500 mt-2">

          <img
            src={new URL(`./data/${session.image}`, import.meta.url).href}
            alt={session.title}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span>{session.mentor}</span>
          <span>•</span>
          <span>{session.date}</span>

          {session.duration && (
            <>
              <span>•</span>
              <span>{session.duration}</span>
            </>
          )}

          <span>• Recorded Lecture</span>
        </div>
      </div>

      {/* Banner */}
      <div className="mb-6">
        <img
          src={sessionData}
          alt="banner"
          className="w-2xl h-[350px] object-fill rounded-lg"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 bg-[#F3F3F3] p-4 rounded-xl mb-6">

        {[
          { name: "Notes", icon: <FileText size={18} /> },
          { name: "Slides", icon: <Monitor size={18} /> },
          { name: "Test", icon: <Gauge size={18} /> },
          { name: "Practice", icon: <BookOpen size={18} /> },
          { name: "Discussions", icon: <Users size={18} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 text-sm ${
              activeTab === tab.name
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}

      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm">

        {/* ================= NOTES ================= */}
        {activeTab === "Notes" && (
          <div>
            <h2 className="font-semibold mb-4">Notes (PDF)</h2>

            <div className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <p className="font-medium">{session.title} Notes</p>
                <p className="text-sm text-gray-500">
                  Download complete lecture notes in PDF format.
                </p>
              </div>

              <a
                href={new URL(`./data/${session.notesPdf}`, import.meta.url).href}
                download
              >
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                  Download PDF
                </button>
              </a>
            </div>
          </div>
        )}

     
        {activeTab === "Slides" && (
          <div>
            <h2 className="font-semibold mb-4">Slides (PPT)</h2>

            <div className="relative">
              <img
                src={sessionData}
                alt="slide"
                className="w-3xl h-[350px] object-fit rounded-lg"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                <button className="bg-white p-2 rounded-full shadow">
                  ◀
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}

    
        {activeTab === "Test" && (
          <div>
            <h2 className="font-semibold mb-4">Test Link</h2>

            <a
              href="https://componentspropsreacttest.in"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              https://componentspropsreacttest.in
            </a>
          </div>
        )}

       
        {activeTab === "Practice" && (
          <div>
            <h2 className="font-semibold mb-4">Practice Exercises</h2>

            <div className="border p-4 rounded-lg">
              <p className="mb-2">
                1. Create a reusable Button component using props.
              </p>
              <p className="mb-2">
                2. Pass dynamic data between Parent and Child components.
              </p>
              <p>
                3. Build a Card component that accepts title and description.
              </p>
            </div>
          </div>
        )}

    
        {activeTab === "Discussions" && (
          <div>
            <h2 className="font-semibold mb-4">Discussions</h2>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Share your thoughts?"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="space-y-4">

              {[
                {
                  name: "Ajay Jain",
                  text: "Props helped me understand how data flows between components.",
                },
                {
                  name: "Ruchika Roy",
                  text: "Passing props step by step clarified component communication.",
                },
                {
                  name: "Ritik Thakur",
                  text: "Always keep components small and reusable.",
                },
              ].map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{comment.name}</p>
                  <p className="text-sm text-gray-600">
                    {comment.text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}