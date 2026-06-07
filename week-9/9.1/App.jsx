// import React from "react";

// function  App(){
//     const [count, setCount]=React.useState(0);//hook

//     return (
//         <div>
//             <Button count={count} setCount ={setCount}></Button>
//         </div>
//     )
// }
//      function Button(props){
//         function onButtonClick(){
//             props.setCount(props.count+1)
//         }
//         return <button onClick={onButtonClick}>Counter {props.count}</button>
//      }

//      export default App

     // class code
     import React ,{useState} from 'react';

     export default function App(){
        const [count,setCount]=useState(0);

        function onClickHandler(){
            setCount(count +1)
        }

        return(
            <div>
                <button id ="btn" onClick={onClickHandler}> Counter {count}
                </button>
            </div>
        )
     }