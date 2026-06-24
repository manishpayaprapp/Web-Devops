// ---------------------------------------Context API ------------------------------------------------

import React, {useState, useEffect, createContext, useContext} from "react";
const BulbContext=createContext();

function BulbProvider({children}){  // This thing is optional, it will help to look code more cleaner 
    const [bulbOn, setBulbOn]=useState(true);
return (
    <div>
        <BulbContext.Provider value={{
            bulbOn : bulbOn,
            setBulbOn: setBulbOn
        }}>
       {children}
        </BulbContext.Provider>
    </div>)
}
function App(){
    return (
    <div>
      <BulbProvider>
        <Light/>
      </BulbProvider>
    </div>
)
}
function Light(){
    return (
        <div>
            <LightBulb />
            <LightSwitch />
        </div>
    )
}
function LightBulb(){
    const {bulbOn} = useContext(BulbContext);
    return(
        <div>
            {bulbOn ? "Bulb is on" : "Bulb is off"}
        </div>
    )
}
function LightSwitch(){
    const {setBulbOn} = useContext(BulbContext);
    function Toggle(){
        setBulbOn(currentSate => !currentSate)
    }
    return (
        <div>
          <button onClick={Toggle}>Toggle The Bulb</button>  
        </div>
    )
}

export default App