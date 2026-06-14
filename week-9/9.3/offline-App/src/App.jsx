import { useState } from 'react'
import './App.css'
import { PostComponent} from './Post'

function App() {
    const [posts,setPosts]=useState([]);

  const PostComponents =posts.map(post => <PostComponent
        name={post.name}
        subtitle={post.subtitle}
        image={post.image}
        time={post.time}
        discription={post.discription}
  />)
  function addPost(){
    setPosts([...posts,{
    name:"100Xdev",
    subtitle:"23045 followers",
    image:"https://projects.100xdevs.com/_next/image?url=https%3A%2F%2Fappx-wsb-gcp.akamai.net.in%2Fsubject%2F2023-01-17-0.17044360120951185.jpg&w=384&q=75",
    time:"39 min ago",
    discription:"Just completed my first React project today! 🚀 Learning something new every day."
    }])
  }

  return <div style={{background:"#C0C0C0",height:"100vh"}}>
    <div><button onClick={addPost}>ADD POST</button>
      </div>
    <div style={{display:"flex",justifyContent:"center"}}>
      <div>
        <div>{PostComponents}</div>
      </div>
    </div>
    
  
    </div>
}
export default App
