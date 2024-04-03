import { useState } from 'react'
import CreatePost from './Components/Posts/CreatePost'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreatePost />
    </div>
  )
}

export default App
