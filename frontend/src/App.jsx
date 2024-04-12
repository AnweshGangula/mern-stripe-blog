import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import CreatePost from './Components/Posts/CreatePost'
import PostsList from './Components/Posts//PostsList'
import PublicNavbar from './Components/Navbar/PublicNavbar'
import PrivateNavbar from './Components/Templates/PrivateNavbar'
import Home from './Components/Home/Home'
import PostDetails from './Components/Posts/PostDetails'
import UpdatePost from './Components/Posts/UpdatePost'
import Login from './Components/User/Login'
import Register from './Components/User/Register'
import Profile from './Components/User/Profile'
import { checkAuthStatusAPI } from './APIServices/users/usersAPI'
import { isAuthenticated } from './redux/slices/authSlices';

function App() {
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ['check-user-auth'],
    queryFn: checkAuthStatusAPI
  });
  
  // console.log({data})
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  
  // Get logged in user from store
  const { userAuth } = useSelector((state) => state.auth);
  
  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/lists' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Profile />} path='/profile' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
