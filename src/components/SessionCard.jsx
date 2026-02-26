export default function SessionCard({ title }) {

  return (

    <div className="bg-[#2360BB0F] p-4 rounded-xl">

      <h4 className="text-red-600 font-medium">
        {title}
      </h4>


      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
        Join Session
      </button>


    </div>

  );

}
