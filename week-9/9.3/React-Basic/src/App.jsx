//------------------------------------------ Children -------------------------------------------

// import './App.css'

// function App() {
//   return (
//     <div style={{display:"flex"}}>
//      <Card>
//       <div>
//         <input></input>
//       </div>
//      </Card>
//      <Card>
//       <div style={{cursor:"pointer"}}>
//         Search
//       </div>
//      </Card>
//     </div>
    
//   )
// }

// function Card({ children }) {
//   return (
//     <div style={{ backgroundColor: 'silver', borderRadius: 10 ,padding:10}}>
//       {children}
//     </div>
//   )
// }

// export default App

//----------------------------------------------------- List and  Key----------------------------------------

// function App(){
//   return (
//     <div>
//       {[
//         <Todo key={2}title={"Go to gym"} done ={false}></Todo>,
//         <Todo key={1}title={"Eat Food"} done ={true}></Todo>
//       ]}
//     </div>
//   )
// }

// function Todo({title,done}){
// return <div>
//   {title} - {done ?"Done":"Do it"}
// </div>
// }

// export default App

// -------------------------------------------------------Error Boundary--------------------------------------

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: "silver",
            borderRadius: 10,
            padding: 20,
            margin: 20,
          }}
        >
          <h3>Something went wrong</h3>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Card1 />
      </ErrorBoundary>

      <ErrorBoundary>
        <Card2 />
      </ErrorBoundary>
    </div>
  );
}

function Card1() {
  // Uncomment to test
  // throw new Error("Card1 crashed");

  return (
    <div
      style={{
        backgroundColor: "silver",
        borderRadius: 10,
        padding: 20,
        margin: 20,
      }}
    >
      Hi there
    </div>
  );
}

function Card2() {
  return (
    <div
      style={{
        backgroundColor: "silver",
        borderRadius: 10,
        padding: 20,
        margin: 20,
      }}
    >
      hello
    </div>
  );
}

export default App;