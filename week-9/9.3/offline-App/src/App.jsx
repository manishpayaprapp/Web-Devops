import { useEffect, useState } from 'react'
import './App.css'
import { PostComponent} from './Post'

function App(){
  const [currentTab,setCurrentTab]=useState("1");
  const [tabData,setTabData]=useState({});
  const [loading,setloading]=useState(true); //   const [posts,setPosts]=useState([]);

  // const PostComponents =posts.map(post => <PostComponent
  //       name={post.name}
  //       subtitle={post.subtitle}
  //       image={post.image}
  //       time={post.time}
  //       discription={post.discription}
  // />)
  // function addPost(){
  //   setPosts([...posts,{
  //   name:"100Xdev",
  //   subtitle:"23045 followers",
  //   image:"https://projects.100xdevs.com/_next/image?url=https%3A%2F%2Fappx-wsb-gcp.akamai.net.in%2Fsubject%2F2023-01-17-0.17044360120951185.jpg&w=384&q=75",
  //   time:"39 min ago",
  //   discription:"Just completed my first React project today! 🚀 Learning something new every day."
  //   }])
  // }


  useEffect(()=>{
    setloading(true)
    fetch("https://jsonplaceholder.typicode.com/todos/"+currentTab)
    .then(async res=>{
      const json =await res.json();
      setTabData(json);
      setloading(false)
    });
  },[currentTab])

  return<div>
    <div style={{display:"flex"}}>
      <button onClick={()=>{setCurrentTab("1")}} style={{color:currentTab == "1"?"red":"black",margin:10}}>Todo #1</button>
      <button onClick={()=>{setCurrentTab("2")}} style={{color:currentTab == "2"?"red":"black",margin:10}}>Todo #2</button>
      <button onClick={()=>{setCurrentTab("3")}} style={{color:currentTab == "3"?"red":"black",margin:10}}>Todo #3</button>
      <button onClick={()=>{setCurrentTab("4")}} style={{color:currentTab == "4"?"red":"black",margin:10}}>Todo #4</button>
    </div>

    {loading ? "Loading....":tabData.title}

    {/* <div style={{background:"#C0C0C0",height:"100vh"}}>
     <div><button onClick={addPost}>ADD POST</button>
       </div>
     <div style={{display:"flex",justifyContent:"center"}}>
       <div>
         <div>{PostComponents}</div>
       </div>
     </div>
    
  
     </div> */}
    </div>
    
  
}

export default App
