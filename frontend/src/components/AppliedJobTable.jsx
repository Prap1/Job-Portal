import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import Navbar from "./shared/Navbar";

// Sample applied jobs data
const appliedJobs = [
  {
    jobTitle: "Frontend Developer",
    company: "ABC Tech Solutions",
    appliedDate: "Jan 10, 2024",
    status: "Pending",
  },
  {
    jobTitle: "ReactJS Developer",
    company: "XYZ Innovations",
    appliedDate: "Feb 5, 2024",
    status: "Interview Scheduled",
  },
  {
    jobTitle: "Software Engineer",
    company: "Global Systems",
    appliedDate: "Dec 15, 2023",
    status: "Rejected",
  },
  {
    jobTitle: "Software Engineer",
    company: "Global Systems",
    appliedDate: "Dec 15, 2023",
    status: "Rejected",
  },
];

const AppliedJobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl  mx-auto p-8 bg-white rounded-2xl my-5">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>

        <div className="flex justify-between items-center mb-5 ">
          <div className="flex items-center gap-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by Job Title or Company"
              className="border rounded-md p-2"
            />
          </div>
          <Button variant="outline" className="bg-blue-600 hover:bg-blue-500">
            Apply for New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[66vh]">
          {appliedJobs.map((job, index) => (
            <div
              key={index}
              className="border p-6 rounded-lg shadow-md bg-white"
            >
              <h3 className="font-medium text-xl mt-2">{job.jobTitle}</h3>
              <p className="text-gray-600 mb-2 mt-2">{job.company}</p>
              <p className="text-sm text-gray-500 mt-2">
                Applied on: {job.appliedDate}
              </p>
              <div className="mt-4 ">
                <Badge
                  className={`
            ${
              job.status === "Pending"
                ? "bg-yellow-500 text-white"
                : job.status === "Interview Scheduled"
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
            }
            px-3 py-0 text-lg rounded-lg
        `}
                >
                  {job.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
