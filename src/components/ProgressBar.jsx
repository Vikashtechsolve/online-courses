export default function ProgressBar({ title, progress }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm mb-3">
        <span className="font-semibold text-slate-900">{title}</span>
        <span className="text-slate-500">In Progress</span>
        <span className="ml-auto font-medium text-slate-800">{progress}</span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-600 to-indigo-500 h-full rounded-full"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}