import { useState } from 'react'
import './App.css'

function App() {
  return <div style={{background:"#C0C0C0",height:"100vh"}}>
    <PostComponent/>
  
    </div>
}
    
 
const style={width:200,backgroundColor:"white",borderRadius:10,borderColor:"gray",borderWidth:1}

function PostComponent(){
  return (
    <div style={style}>
      <div style={{display:"flex"}}>
        <img
          src="https://projects.100xdevs.com/_next/image?url=https%3A%2F%2Fappx-wsb-gcp.akamai.net.in%2Fsubject%2F2023-01-17-0.17044360120951185.jpg&w=384&q=75"
          style={{width:40,height:40,borderRadius:20}}
        />

        <div >
          <div style={{fontSize:10,marginLeft:20}}>
          <b>100Xdev</b>
            <div>1,23,43,434 followers</div>
            <div>12m</div>
          </div>
        </div>
      </div>

      <div style={{fontSize:12}}>
        Discription
      </div>
    </div>
  );
}
export default App
