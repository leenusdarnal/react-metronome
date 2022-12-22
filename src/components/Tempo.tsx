import { SetStateAction, PropsWithChildren } from 'react'

interface receivedProps {
  beatsPerMeasure: number
  handleTempo: (value: number) => void
}

const Tempo = ({ beatsPerMeasure, handleTempo }: receivedProps) => {
  return (
    <div className='container m-2'>
      <label htmlFor='beatSpeed' className=''>
        Choose a Beat
      </label>
      <select
        id='beatSpeed'
        className='p-2 ml-3 bg-slate-700 text-white  dark:text-white'
        value={beatsPerMeasure}
        onChange={(e) => handleTempo(parseInt(e.target.value))}
      >
        <option value='1'>1/4</option>
        <option value='2'>2/4</option>
        <option value='3'>3/4</option>
        <option value='4'>4/4</option>
      </select>
    </div>
  )
}

export default Tempo
