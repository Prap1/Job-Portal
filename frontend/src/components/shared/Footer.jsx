import { FaFacebook,FaTwitter,FaLinkedin} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 text-center sm:text-left">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Job Seekers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Seekers</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Find Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Career Advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Resume Builder</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Interview Tips</a></li>
            </ul>
          </div>

          {/* Employers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Employers</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Post Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Browse Resumes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Employer Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Pricing Plans</a></li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white mb-2 block">Blog</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook />

              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter/>

              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin />

              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <AiFillInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">© 2025 JobPortal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
