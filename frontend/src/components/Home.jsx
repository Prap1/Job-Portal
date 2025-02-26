
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarsouel from "./CategoryCarsouel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetJobhooks from "./hooks/useGetJobhooks";
const Home = () => {
  useGetJobhooks();
  return (
    <>
      <Navbar />
      <HeroSection/>
      <CategoryCarsouel/>
      <LatestJobs/>
      <Footer/>
    </>
  );
};

export default Home;
