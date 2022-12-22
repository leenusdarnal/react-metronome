import { SetStateAction } from 'react'
import DarkmodeIcon from './DarkModeicon'
import LightmodeIcon from './LightModeicon'

export const Navbar = ({
  darkmode,
  toggleDarkMode,
}: {
  darkmode: boolean
  toggleDarkMode: () => void
}) => {
  return (
    <nav className='mt-2 container flex w-full justify-between'>
      <div className='m-auto font-bold text-black text-5xl dark:text-white'>
        Metronome
      </div>
      <div onClick={toggleDarkMode} className='cursor-pointer w-10'>
        {darkmode ? (
          <DarkmodeIcon className='fill-white' />
        ) : (
          <LightmodeIcon className='fill-black' />
        )}
      </div>
    </nav>
  )
}
