import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import './App.css'
import Metronome from './Metronome'
const App = () => {
  const [darkmode, setDarkmode] = useState(false)

  const toggleDarkMode = (): void => {
    localStorage.theme = !darkmode
    setDarkmode((prevDarkmode) => (localStorage.theme = !prevDarkmode))
  }

  useEffect(() => {
    setDarkmode(localStorage.theme === 'true')
  }, [])

  return (
    <div className={`${darkmode ? 'dark' : ''}`}>
      <div className='grid grid-flow grid-cols-1 w-full place-content-center gap-5 items-center   dark:bg-slate-900'>
        <Navbar darkmode={darkmode} toggleDarkMode={toggleDarkMode} />
        <Metronome />
      </div>
    </div>
  )
}

export default App
