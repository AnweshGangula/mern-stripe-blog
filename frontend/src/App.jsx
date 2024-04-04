import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CreatePost from './Components/Posts/CreatePost'
import PostsList from './Components/PostsList'
import PublicNavbar from './Components/Navbar/PublicNavbar'
import HomePage from './Components/Home/HomePage'

function App() {

  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route element={<HomePage />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/lists' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
