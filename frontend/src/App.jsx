import { useState } from 'react'
import CreatePost from './Components/Posts/CreatePost'
import PostsList from './Components/PostsList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreatePost />
      <PostsList />
    </div>
  )
}

export default App
