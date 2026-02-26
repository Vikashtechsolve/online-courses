import { LuSearch, LuBell } from "react-icons/lu";


export default function Header() {
  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center border-b">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-[400px]">
        <LuSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <LuBell size={20} />
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}