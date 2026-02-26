export default function ProgressBar({ title, progress }) {

  return (

    <div className=" bg-[#F2F2F2] p-4 mb-3 w-60 px-4">

      <div className="flex justify-between text-sm mb-1">

        <span className="text-red-600">
          {title}
        </span>

        <span>
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