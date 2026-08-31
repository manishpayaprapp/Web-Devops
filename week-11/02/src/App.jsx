import { useState, memo } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { atomCounter, evenSelector } from "./store/atom/counter";

function App(){

return <>
<RecoilRoot>
  <h2>
<Counter/>
  </h2>
<Button/>
<h1>
<IsEven/>
</h1> 
</RecoilRoot>
</>
}
function Button (){
  const setCount = useSetRecoilState(atomCounter);
  return<>
  <button onClick={()=>setCount(c => c+2)}>Increase</button>
  <button onClick={()=>setCount(c => c-1)}>Decrease</button>
  </>
}
function Counter(){
  const count = useRecoilValue(atomCounter);
  return<>
  {count}
  </>
}
function IsEven(){
  const even  = useRecoilValue(evenSelector);
  return <>
  {even ? "Even" : "Odd"}
  </>
}

export default App;