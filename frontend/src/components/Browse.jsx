import { useDispatch, useSelector } from "react-redux";
import Job from "./job";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div>
          <h1 className="font-bold text-xl my-10">
            Search Results {allJobs.length}
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {allJobs.map((item) => (
              <Job key={item._id} job={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
