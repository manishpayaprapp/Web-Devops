import {BrowserRouter,Routes,Route,Link,useNavigate} from 'react-router-dom'
import './App.css'

function App() {
    
    return <>
    
    <BrowserRouter>
    <Link to="/">ALLEN </Link>
    <Link to="/neet/online-coching-class-11"> Class-11 </Link>
    <Link to="/neet/online-coching-class-12"> Class-12 </Link>
    <Routes>
        <Route path="/neet/online-coching-class-11" element={<Class11/>}/>
        <Route path="/neet/online-coching-class-12" element={<Class12/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </BrowserRouter>
    </>  
}
function ErrorPage(){
    return <>
    Sorry Page Not Found
    </>
}
function Class11(){
     const navigate = useNavigate();
    function backToLandingPage(){
        navigate("/");
    }
    return <div>
        Welcome to Class 11     
        <button style={{cursor:"pointer"}}onClick={backToLandingPage}>Back</button>
    </div>
}
function Class12(){
    const navigate = useNavigate();
    function backToLandingPage(){
        navigate("/");
    }
    return <div>
        Welcome to Class 12     
        <button style={{cursor:"pointer"}}onClick={backToLandingPage}>Back</button>
    </div>
}
function LandingPage(){
    return <div>
    Welcome to ALLEN
    </div>
}
export default App
