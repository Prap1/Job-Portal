import axios from 'axios'

import { COMPANY_API } from '../utils/constants'
import { setCompanies } from '@/redux/companySlice'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API}/get/company`,{withCredentials:true});
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies