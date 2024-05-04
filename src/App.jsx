import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import Search from './components/Search/Search'
import CustomRoutes from './Routes/CustomRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='outer-pokedex'>
      <h1 id="pokedex-heading">
        <Link to = "/">POKEDEX</Link>
      </h1>
      <CustomRoutes/>

    </div>
  )
}

export default App
