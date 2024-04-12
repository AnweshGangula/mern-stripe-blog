import { useQuery } from '@tanstack/react-query'
import { Navigate } from "react-router-dom";

import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';
import AuthCheckingComponent from '../Templates/AuthCheckingComponent';

const AuthRoute = ({ children }) => {
    const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
        queryKey: ['check-user-auth'],
        queryFn: checkAuthStatusAPI,
        // staleTime: 1000 * 60 * 10
    });

    if (isLoading) {
        return <AuthCheckingComponent />
    }

    console.log({ data })
    if (isError || !data?.isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children

}

export default AuthRoute