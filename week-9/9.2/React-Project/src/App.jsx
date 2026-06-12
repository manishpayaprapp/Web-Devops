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
// import { useState,useEffect } from "react";

// function App(){
//   const [CounterVisible,setCounterVisible]=useState(true);

//   useEffect(function(){
//     setInterval(function(){
//       setCounterVisible(c => !c)
//     },5000);  
//   },[])
//   return <div>
//     <h1>UseEffect</h1>
//     {CounterVisible && <Counter></Counter>} 
//     {/* OR */}
//     {/* {CounterVisible ? <Counter></Counter> : null} */}
//   </div>
// }

// function Counter(){
//   const [count,SetCount]=useState(0);
//   console.log("Without UseEffect")
//   useEffect(function(){
//     setInterval(function(){ //mount
//       // setCount(count=>count+1)  // OR
//       SetCount(function(currentValue){
//         return currentValue+1;
//       });
//     },1000)
//     return function(){ //unmount
//       clearInterval(clock)
//     }
//   },[]);

//   return <div>
//     <h1>
//       {count}
//     </h1>
//   </div>
// }

// export default App


//----------------------------------------------
import { useState,useEffect } from "react";
function App(){
  const [count,setCount]=useState(0);
  const [count2,setCount2]=useState(0);
  function increse(){
    setCount(c=>c+1);
  }
  function decrese(){
    setCount2(c=>c-1);
  }
return <div>
  <Counter count={count} count2={count2}/>
  <button id="count" onClick={increse}>Increse Count</button>
  <button id="count" onClick={decrese}>Decrese Count</button>
</div>
}
function Counter(props){
  useEffect(function(){
    console.log("Mount")
  },[])
  
  useEffect(function(){
    console.log("count is changed")

    return(function(){
    console.log("Cleanup wala")
    })
  },[props.count,props.count2])
  return <div>
    <h1>Counter1 {props.count}</h1><br></br>
    <h1>Counter2 {props.count2}</h1>
  </div>
}
export default App