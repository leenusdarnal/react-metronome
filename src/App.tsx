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
    <div className={` max-h-screen ${darkmode ? 'dark' : ''}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-flow grid-cols-1 w-full place-content-center gap-5 items-center'>
          <Navbar darkmode={darkmode} toggleDarkMode={toggleDarkMode} />
          <div className='bg-white dark:bg-slate-900 p-6 rounded-md shadow-lg'>
            <Metronome />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
