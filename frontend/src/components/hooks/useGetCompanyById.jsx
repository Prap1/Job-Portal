import axios from 'axios'
import { useEffect } from 'react'
import { COMPANY_API, JOB_API_END_POINT } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import { setSingleCompany } from '@/redux/companySlice'

const useGetCompanyById = (companyId) => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async ()=>{
      try {
         const response = await axios.get(`${COMPANY_API}/get/${companyId}`,{withCredentials:true});
         if(response.data.success){
          dispatch(setSingleCompany(response.data.company));

         }
      } catch (error) {
        console.log(error);
      }
     
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}

export default useGetCompanyById