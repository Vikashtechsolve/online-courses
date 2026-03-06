export default function SessionCard({ title , date, Time, mentor }) {

  return (

    <div className="bg-[#2360BB0F] p-4 rounded-xl">

      <h4 className="text-red-600 font-medium">
        {title}
      </h4>

      <p className="text-sm py-2 text-gray-600 " >
       <span className="font-bold"> Date: </span>0{date}
      </p>

      <p className="text-sm py-2 text-gray-600" >
       <span className="font-bold"> Time: </span>{Time}
      </p>

      <p className="text-sm py-2 text-gray-600 " >
       <span className="font-bold"> Mentor: </span> {mentor}
      </p>


      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
        Join Session
      </button>


    </div>

  );

}
