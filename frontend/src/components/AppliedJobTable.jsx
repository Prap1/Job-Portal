import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  // Ensure allAppliedJobs is the correct object and access the `applications` array
  const { allAppliedJobs } = useSelector((store) => store.job);
  const jobs = allAppliedJobs; // Access the applications array
   console.log(allAppliedJobs);
   const navigate = useNavigate(); // Initialize navigate hook

   const handleClick = () => {
     // Redirect to the job page when the button is clicked
     navigate("/jobs");
   };
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl my-5">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>

        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by Job Title or Company"
              className="border rounded-md p-2"
            />
          </div>
          <Button onClick={handleClick} variant="outline" className="bg-blue-600 hover:bg-blue-500">
            Apply for New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length <= 0 ? (
            <div className="col-span-full text-center">
              You haven't applied to any jobs yet.
            </div>
          ) : (
            jobs.map((appliedJob) => (
              <div
                key={appliedJob._id}
                className="border p-6 rounded-lg shadow-md bg-white"
              >
                <h3 className="font-medium text-xl mt-2">
                  {appliedJob.job?.title}
                </h3>
                <p className="text-gray-600 mb-2 mt-2">
                  {appliedJob.job?.company?.name}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Applied on: {appliedJob?.createdAt?.split("T")[0]}
                </p>
                <div className="mt-4">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    } px-3 py-0 text-lg rounded-lg`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
