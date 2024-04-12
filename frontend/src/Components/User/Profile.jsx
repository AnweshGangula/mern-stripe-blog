import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI'
import { isAuthenticated } from '../../redux/slices/authSlices';

const Profile = () => {
    const {isError, isLoading, isSuccess, data, error, refetch} = useQuery({
        queryKey: ['check-user-auth'],
        queryFn: checkAuthStatusAPI
    });

    // console.log({data})

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(isAuthenticated(data));
    }, [data]);
    
  return (
    <div>Profile</div>
  )
}

export default Profile