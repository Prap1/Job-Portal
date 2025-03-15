import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/recruiter/Companies';
import CompanyCreate from './components/recruiter/CompanyCreate';
import CompanySetup from './components/recruiter/CompanySetup';
import AdminJobs from './components/recruiter/AdminJobs';
import PostJob from './components/recruiter/PostJob';
import ProtectedRoute from './components/recruiter/ProtectedRoute';
import Applicants from './components/recruiter/Applicants';
import AppliedJob from './components/AppliedJob';


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />, 
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/appliedjob',
    element: <AppliedJob />,
  },
  {
    path: '/admin/companies',
    element: <Companies />,
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />,
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />,
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
