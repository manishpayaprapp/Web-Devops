// Intro

// import { useState } from 'react'
// import './App.css'

// // custom Hook
// function useCounter(){
//     const [count, setCount] = useState(0)

// function IncreaseCount(){
//   setCount(count +1)
// }
// function DecreaseCount(){
//   setCount(count -1)
// }
// return {
//   count : count,
//   IncreaseCount : IncreaseCount,
//   DecreaseCount : DecreaseCount
// }
// }

// function App() {
//   return (
//     <>
//     <Counter/>
//     </>
//   )
// }
// function Counter(){
//   const {count, IncreaseCount, DecreaseCount} = useCounter();
//   return (
//     <>
//     {count}
//     <br/>
//     <button onClick={IncreaseCount}>Increase Count</button>
//     <button onClick={DecreaseCount}>Decrease Count</button>
//     </>
//   )
// }


// export default App

// ------------------------------------- useFetch and use-re-fetch------------------------------------------------
// import { useFetch} from "./hooks/useFetch"
// import { useState } from "react"
// function App(){
// const [currentPost, setCurrentPost] = useState(1);
// const {finalData, Loading} = useFetch("https://jsonplaceholder.typicode.com/todos/"+currentPost, 10)
// if(Loading){
// return (
// <>
// Loading.....
// </>)
// }

// return (
//   <>
//   <button onClick={() =>{setCurrentPost(1)}}>1</button>
//   <button onClick={() =>{setCurrentPost(2)}}>2</button>
//   <button onClick={() =>{setCurrentPost(3)}}>3</button>
//   <button onClick={() =>{setCurrentPost(4)}}>4</button>
//   <button onClick={() =>{setCurrentPost(5)}}>5</button>
//   {JSON.stringify(finalData)}
//   </>
// )
// }

// export default App

import { useState } from "react";
import { usePrev } from "./hooks/usePrev";
function App(){
  const [count, setCount] = useState(0);
  const prev = usePrev(count)
return (
  <>
  {count}
  <br/> 
  <button onClick={() =>{
    setCount(count + 1)
  }}>increase Count</button>
  <button onClick={() =>{
    setCount(count - 1)
  }}>increase Count</button>
  <br/>
  previous vue of count is {prev}
  </>
)
}
export default App