export default function SessionCard({
  title,
  date,
  time,
  Time,
  mentor,
  courseTitle,
  meetingLink,
}) {
  const sessionTime = time ?? Time;
  const canJoin = Boolean(meetingLink);

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Today's Session
      </p>
      <h4 className="text-slate-900 font-semibold text-base mt-1">{title}</h4>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        {courseTitle ? (
          <p>
            <span className="font-medium text-slate-700">Course:</span>{" "}
            {courseTitle}
          </p>
        ) : null}
        <p>
          <span className="font-medium text-slate-700">Date:</span> {date}
        </p>
        <p>
          <span className="font-medium text-slate-700">Time:</span>{" "}
          {sessionTime}
        </p>
        <p>
          <span className="font-medium text-slate-700">Mentor:</span> {mentor}
        </p>
      </div>

      {canJoin ? (
        <a
          href={meetingLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Join Session
        </a>
      ) : (
        <button
          disabled
          className="mt-5 bg-slate-300 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed"
        >
          Link Not Added
        </button>
      )}
    </div>
  );
}
