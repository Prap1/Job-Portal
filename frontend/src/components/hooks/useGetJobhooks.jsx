import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'

const useGetJobhooks = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchAllJobs = async ()=>{
      try {
         const response = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
         if(response.data.success){
          dispatch(setAllJobs(response.data.jobs));

         }
      } catch (error) {
        console.log(error);
      }
     
    }
    fetchAllJobs();
  },[])
}

export default useGetJobhooks