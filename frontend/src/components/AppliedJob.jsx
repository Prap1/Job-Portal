import AppliedJobs from "./AppliedJobTable";
import useGetAppliedJobs from "./hooks/useGetAppliedJobs";

const AppliedJob = () => {
  useGetAppliedJobs();
  return <AppliedJobs />;
};

export default AppliedJob;
