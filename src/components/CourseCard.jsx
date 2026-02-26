
export default function CourseCard({ title, mentor, duration }) {

  return (

    <div className="bg-[#2360BB0F] w-80 p-4 rounded-xl shadow-sm">

      <h4 className="text-red-600 font-medium">
        {title}
      </h4>


      <p className="text-sm py-2 text-gray-600 mt-2">
        Mentor name: {mentor}
      </p>


      <p className="text-sm py-2 text-gray-600">
        Course Duration: {duration}
      </p>


      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
        Continue Learning
      </button>


    </div>

  );

}