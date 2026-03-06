export default function ProgressBar({ title, progress }) {

  return (

    <div className=" bg-[#F2F2F2] p-4 mb-3 lg:w-96 rounded px-4">

      <div className="flex gap-2 text-sm mb-1">

        <span className="text-red-600"> 
          {title} 
        </span>
          <span className="text-gray-600">In Progress</span>
        <span className="ml-auto">
          {progress}
        </span>

      </div>


      <div className="w-full bg-[#BEBEBE66] h-3 rounded-full">

        <div
          className="bg-[#B11C20] h-3 rounded-full"
          style={{ width: progress }}
        ></div>

      </div>


    </div>

  );

}