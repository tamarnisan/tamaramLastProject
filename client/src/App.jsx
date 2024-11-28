import { useState } from 'react'
import LogIn from './LogIn'
import Register from './Register'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
{/* <LogIn/> */}
<Register/>
</>
  )
}

export default App
