import React from "react";
import useRoadmap from "../hooks/useRoadmap";
import { FaArrowUp } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import { Link } from "react-router-dom";

const RoadmapList = () => {
  const { roadmaps } = useRoadmap();

  console.log(roadmaps);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">All Roadmaps</h2>
      <div className="flex flex-col gap-3">
        {roadmaps &&
          roadmaps.map((roadmap, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-5 p-2 bg-gray-100 shadow-lg rounded-sm"
            >
              <div className="w-full flex justify-between items-center">
                <p>{roadmap?.title}</p>
                <p className={`${roadmap?.status === "In Progress" && "bg-blue-300"} ${roadmap?.status === "Planned" && "bg-red-300"} ${roadmap?.status === "Completed" && "bg-green-300"} font-semibold text-xs px-3 py-1 rounded-sm`}>{roadmap?.status}</p>
              </div>
              <div>
                <p>{roadmap?.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="flex items-center gap-2 bg-black text-white text-sm px-3 py-1">
                    <FaArrowUp /> {roadmap?.votes} UpVotes
                  </p>
                  <p className="flex items-center gap-2 bg-black text-white text-sm px-3 py-1">
                    <LiaCommentDots /> Comments
                  </p>
                </div>
                <Link to={`/roadmap/${roadmap._id}`}>
                  <p className=" bg-black border text-white text-sm cursor-pointer hover:bg-white hover:text-black duration-300 active:scale-95 px-3 py-1">
                    View Details
                  </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoadmapList;
