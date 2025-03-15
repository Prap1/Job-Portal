import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarsouel from "./CategoryCarsouel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetJobhooks from "./hooks/useGetJobhooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store";
const Home = () => {
  useGetJobhooks();
  // const dispatch =useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarsouel />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
