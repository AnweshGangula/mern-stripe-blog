import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CreatePost from './Components/Posts/CreatePost'
import PostsList from './Components/Posts//PostsList'
import PublicNavbar from './Components/Navbar/PublicNavbar'
import Home from './Components/Home/Home'
import PostDetails from './Components/Posts/PostDetails'
import UpdatePost from './Components/Posts/UpdatePost'

function App() {

  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/lists' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
