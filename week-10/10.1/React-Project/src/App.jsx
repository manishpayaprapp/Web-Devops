// import {BrowserRouter,Routes,Route,Link,useNavigate, Outlet} from 'react-router-dom'
// import './App.css'

// function App() {
    
//     return <>
    
//     <BrowserRouter>
    
//     <Routes>
//         <Route path='/' element ={<Layout/>}>
//         <Route path="/neet/online-coching-class-11" element={<Class11/>}/>
//         <Route path="/neet/online-coching-class-12" element={<Class12/>}/>
//         <Route path="/" element={<LandingPage/>}/>
//         <Route path="*" element={<ErrorPage/>}/>
//         </Route>
//     </Routes>
//     </BrowserRouter>
//     </>  
// }
// function Layout(){
//     return <div style={{height:"100vh",backgroundColor:"silver"}}>
    
//     <Header/>
//     <div style={{height:"90vh",backgroundColor:"white"}}>
//             <Outlet/>
//         </div> 
//     Footer | Contact us
//     </div>
// }
// function Header(){
//     return <div>
//     <Link to="/">ALLEN </Link>
//     <Link to="/neet/online-coching-class-11"> Class-11 </Link>
//     <Link to="/neet/online-coching-class-12"> Class-12 </Link>
//     </div>
// }
// function Class11(){
//      const navigate = useNavigate();
//     function backToLandingPage(){
//         navigate("/");
//     }
//     return <div>
//         Welcome to Class 11     
//         <button style={{cursor:"pointer"}}onClick={backToLandingPage}>Back</button>
//     </div>
// }
// function Class12(){
//     const navigate = useNavigate();
//     function backToLandingPage(){
//         navigate("/");
//     }
//     return <div>
//         Welcome to Class 12
//         <br/>     
//         <button style={{cursor:"pointer"}}onClick={backToLandingPage}>Back</button>
//     </div>
// }
// function LandingPage(){
//     return <div>
//     Welcome to ALLEN
//     </div>
// }
// function ErrorPage(){
//     return <div>
//     Sorry Page Not Found
//     </div>
// }
// export default App


// -------------------------------------------useRef(getting a Elemnt)-----------------------------------------

// import {useRef} from "react";

// function App(){
//     const inputRef=useRef();
//     function focusOnInput(){
//         inputRef.current.focus();
//     }
// return <div>
//     Sign in
//     <input ref={inputRef} type="text"></input>
//     <input type="text"></input>
//     <button onClick={focusOnInput}>submit</button>
// </div>
// }

// export default App

//-------------------------------------------------------useRef (value)----------------------------------------------------
import { useState,useRef } from "react";

let timerValue = null;

function App(){
    const [count,setCount]=useState(0);
    const timer =useRef();
    
    function startTimer(){
        timerValue = setInterval (function(){
            setCount(c => c + 1);
        },1000);
        timer.current =timerValue;
    }
    function stopTimer(){
        clearInterval(timer.current);
    }
return <div>
{count}
<br/>
<button onClick={startTimer} >start</button>
<span style={{marginLeft:20}}>
<button onClick={stopTimer} >stop</button>
</span>
</div>
}
export default App;