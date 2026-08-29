import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { atomCounter } from './store/atom/counter'
function App() {
  return (
    <>
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
    </>
  )
}

function Counter() {

  return (
    <>
    <h2>
      <CurrentCount/>
      </h2>

      <Increase />
      <Decrease/>
    </>
  )
}
function CurrentCount() {
  const count = useRecoilValue(atomCounter);

  return <>{count}</>;
}
function Increase() {
  const setCount = useSetRecoilState(atomCounter);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Increase
    </button>
  )
}

function Decrease() {
  const setCount = useSetRecoilState(atomCounter);
  return (
    <button onClick={() => setCount(c => c - 1)}>
      Decrease
    </button>
  )
}

export default App 