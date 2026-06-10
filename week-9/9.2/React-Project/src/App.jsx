// import { useState } from "react";

// function App() {
//   return (
//     <div>
//       <h1>Counter</h1>
//       <Counter></Counter>
//     </div>
    
//   )
// }
// function Counter(){
//   const [count,setCount]=useState(0);
//   function IncreaseCount(){
//     setCount(count+1);
//   }
//   function DecreaseCount(){
//     setCount(count-1);
//   }
//   function Reset(){
//     setCount(0);
//   }
//   return <div>
//     <h1>{count} </h1>
//     <button onClick={IncreaseCount}>Increase Count</button>
//     <button onClick={DecreaseCount}>Decrease Count</button>
//     <button onClick={Reset}>Reset Count </button>

//   </div>
// }
// export default App

// ---------------------------------------------UseEffect---------------------------------
import { useState,useEffect } from "react";

function App(){
  return <div>
    <h1>UseEffect</h1>
    <Counter></Counter>
  </div>
}

function Counter(){
  const [count,SetCount]=useState(0);
  console.log("Without UseEffect")
  useEffect(function(){
    setInterval(function(){
      // setCount(count=>count+1)  // OR
      SetCount(function(currentValue){
        return currentValue+1;
      });
    },1000)
    console.log("UseEffect");
  },[]);

  return <div>
    <h1>
      {count}
    </h1>
  </div>
}

export default App