import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

function App() {
  // Get logged in user from store
  const { userAuth } = useSelector((state) => state.auth)
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
