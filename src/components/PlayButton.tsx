import React from 'react'

interface receivedProps {
  playing: boolean
  startStopSound: () => void
}

const Button = ({ playing, startStopSound }: receivedProps) => {
  return (
    <>
      <button
        className='w-16 m-2 mb-0 p-2 border-2 rounded bg-red-600 '
        onClick={startStopSound}
      >
        {playing ? 'STOP' : 'PLAY'}
      </button>
    </>
  )
}

export default Button
