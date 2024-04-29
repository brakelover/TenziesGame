import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Tenzies from './components/Tenzies'

function App() {
  const [mess, setMess] = useState("Roll until all dice are the same. Click each die to freeze it at its current value between rolls.");
  

  return (
    <BrowserRouter>
      <main>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home mess={mess} />} />
            <Route path='/tenzies' element={<Tenzies mess={mess} setMess={setMess} />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
