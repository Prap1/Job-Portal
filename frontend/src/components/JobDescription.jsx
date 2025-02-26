import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { APPLY_JOB, SINGLE_JOB_GET } from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";


const JobDescription = () => {
  
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store=>store.auth);
  const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;;
  const params = useParams();
  const jobId = params.id;
  console.log("Job ID from useParams:", jobId);  // Debugging jobId
  
  const dispatch=useDispatch();

const applyJobHandler=async()=>{
  try {
    const res = await axios.get(`${APPLY_JOB}/${jobId}`,{withCredentials : true})
    console.log("Response from applyJobHandler:", res.data);  // Debugging response
    if(res.data.success){
      toast.success(res.data.message);

    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
    
  }
}

  useEffect(() => {
  const fetchSingleJob = async () => {
    try {
      const response = await axios.get(`${SINGLE_JOB_GET}/${jobId}`, { withCredentials: true });
      console.log(response);
      if (response.data.success) {
        // Dispatching the correct action to store the single job
        dispatch(setSingleJob(response.data.job));
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchSingleJob();
}, [jobId, dispatch, user?._id]);


  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {singleJob?.position} Position
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
            {singleJob?.salary} lpa
            </Badge>
          </div>
        </div>
        <Button
        onClick={isApplied ? null : applyJobHandler}
        disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1 ">Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1 ">Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1 ">description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1 ">Experience:<span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span></h1>
        <h1 className="font-bold my-1 ">salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary} lpa</span></h1>
        <h1 className="font-bold my-1 ">total applicants:<span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-1 ">posted date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>

      </div>
    </div>
  );
};

export default JobDescription;
