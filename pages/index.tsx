import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../src/config/hooks'
import { decrement, increment, incrementByAmount, selectCount } from '../src/features/counter'

const IndexPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const [incrementAmount, setIncrementAmount] = useState<number>(0)

  const displayText = `The count is: ${count}`

  return (
    <>
      <h1>Bullet Journal</h1>
      <h2>{displayText}</h2>
      <div>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type='number'
          title='increment by amount'
        />
        <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))} type='button'>
          Increment by amount
        </button>
      </div>
      <div>
        <button type='button' onClick={() => dispatch(decrement())}>
          Decrement by 1
        </button>
        <button type='button' onClick={() => dispatch(increment())}>
          Increment by 1
        </button>
      </div>
    </>
  )
}

export default IndexPage
