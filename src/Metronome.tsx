import { useEffect, useRef, useState } from 'react'
import Button from './components/PlayButton'
import Slider from './components/Slider'
import Tempo from './components/Tempo'

const Metronome = () => {
  const [bpm, setBpm] = useState(80)
  const [playing, setPlaying] = useState(false)
  const [count, setCount] = useState(0)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(3)
  const intervalIdRef = useRef<number | null>(null)

  const playSound = () => {
    const clickSound1 = new Audio('src/assets/click1.wav')
    const clickSound2 = new Audio('src/assets/click1.wav')
    if (count % beatsPerMeasure) {
      clickSound1.play()
    } else {
      clickSound2.play()
    }
    setCount((prevCount) => (prevCount + 1) % beatsPerMeasure)
  }

  const startStopSound = () => {
    if (playing) {
      setPlaying(false)
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
      intervalIdRef.current = null
      setCount(0)
    } else {
      setPlaying(true)
      updateInterval()
    }
  }

  const updateInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }

    const bpmSpeed = (60 * 1000) / bpm
    const newIntervalId = setInterval(playSound, bpmSpeed)
    intervalIdRef.current = newIntervalId
  }

  const handleBpmChange = (value: number) => {
    setBpm(value)
  }

  const handleTempo = (value: number) => {
    setBeatsPerMeasure(value)
  }

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (playing) {
      updateInterval()
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
      setCount(0)
    }
  }, [bpm, beatsPerMeasure, playing])

  return (
    <div className='mt-2  flex w-auto justify-center items-center'>
      <div className='bg-gray-100 p-4 rounded-md shadow-md'>
        <Slider bpm={bpm} handleBpmChange={handleBpmChange} />
        <div className='flex flex-col items-start font-bold text-black text-xl'>
          <Button playing={playing} startStopSound={startStopSound} />
          <Tempo beatsPerMeasure={beatsPerMeasure} handleTempo={handleTempo} />
        </div>
      </div>
    </div>
  )
}

export default Metronome
