import { useEffect, useState } from 'react'
import { setInterval, clearInterval, setTimeout } from 'worker-timers'
import Button from './components/playButton'
import Slider from './components/Slider'
import Tempo from './components/Tempo'

const Metronome = () => {
  const [bpm, setBpm] = useState(80)
  const [playing, setPlaying] = useState(false)
  const [count, setCount] = useState(0)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(3)
  const [timer, setTimer] = useState<Array<number>>([])
  const [firstRender, setFirstRender] = useState(false)
  const clickSound1 = new Audio('src/assets/click1.wav')
  const clickSound2 = new Audio(
    'https://daveceddia.com/freebies/react-metronome/click1.wav'
  )
  // TODO: fix setInterval firing multiple times
  // TODO: fix slider issue maybe use debouncing
  // TODO:  fix how to clear the multiple setInter on worker thread

  const playSound = async () => {
    if (count % beatsPerMeasure) {
      await clickSound1.play()
      console.log(`sound 1`)
    } else {
      await clickSound2.play()
      console.log(`sound 2`)
    }
    setCount((prevCount) => (prevCount + 1) % beatsPerMeasure)
  }

  const updateInterVal = () => {
    // clearInterval(timer)
    if (playing) {
      const bpmSpeed = (60 * 1000) / bpm
      const newTimer = setInterval(playSound, bpmSpeed)
      setTimer((prevState) => [newTimer, ...prevState])
    }
  }
  const stopCurretnTimer = () => {
    for (let i = 0; i < timer.length - 1; i++) {
      clearInterval(timer[i])
      timer.pop()
    }
  }
  const startStopSound = () => {
    if (playing) {
      setPlaying(false)
      setCount(0)
    } else {
      setPlaying(true)
    }
  }
  const handleBpmChange = (value: number): void => {
    stopCurretnTimer()
    setTimeout(() => setBpm(value), 100)
  }

  useEffect(() => {
    if (firstRender) {
      updateInterVal()
    }
  }, [bpm])

  useEffect(() => {
    if (firstRender) {
      if (playing) {
        updateInterVal()
      } else {
        stopCurretnTimer()
      }
    }
  }, [playing])

  useEffect(() => {
    setFirstRender(true)
  }, [])
  useEffect(() => {
    if (firstRender) {
      updateInterVal()
    }
  }, [bpm, beatsPerMeasure])
  // useEffect(() => {
  //   if (firstRender) {
  //     if (playing) {

  //     }
  //   }
  // }, [])
  useState()

  return (
    <div className='mt-2 container flex w-full justify-between flex-col items-center '>
      <Slider bpm={bpm} handleBpmChange={handleBpmChange} />
      <div className='flex  flex-col  items-start font-bold text-black text-xl dark:text-white'>
        <Button playing={playing} startStopSound={startStopSound} />
        {/* <Tempo beatsPerMeasure={beatsPerMeasure} handleTempo={handleTempo} /> */}
      </div>
    </div>
  )
}

export default Metronome
