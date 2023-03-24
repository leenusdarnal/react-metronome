interface receivedProps {
  bpm: number
  handleBpmChange: (value: number) => void
}

const Slider = ({ bpm, handleBpmChange }: receivedProps) => {
  return (
    <div className=' flex items-center bg-slate-500 dark:bg-slate-200'>
      <input
        type='range'
        min='30'
        max='240'
        value={bpm}
        onChange={(e) => handleBpmChange(parseInt(e.target.value))}
        className='w-72 m-1'
      ></input>
    </div>
  )
}

export default Slider
