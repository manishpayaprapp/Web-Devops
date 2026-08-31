import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState
} from 'recoil'
import {memo} from 'react'
import { atomCounter } from './store/atom/counter'

function App() {
  console.log('App rendered')

  return (
    <RecoilRoot>
       <h2>
        <CurrentCount />
      </h2>

      <Increase />
      <Decrease />
    </RecoilRoot>
  )
}

const  CurrentCount = memo( () => {
  console.log('CurrentCount rendered')

  const count = useRecoilValue(atomCounter)

  return <>{count}</>
})

const  Increase = memo(() => {
  console.log('Increase rendered')

  const setCount = useSetRecoilState(atomCounter)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Increase
    </button>
  )
})

const Decrease = memo(() => {
  console.log('Decrease rendered')

  const setCount = useSetRecoilState(atomCounter)

  return (
    <button onClick={() => setCount(c => c - 1)}>
      Decrease
    </button>
  )
})

export default App