import {useState, useEffect} from "react"
import { useAsyncError } from "react-router-dom";
export function useFetch(url, retryTime){
    const [finalData, setFinalData] = useState({})
    const [Loading, setLoading] = useState(true)
  async function getDetails(){
    setLoading(true)
    const response = await fetch(url);
    const json = await response.json();
    setFinalData(json)
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [url]);
  useEffect(()=>{
    setInterval(getDetails, retryTime * 1000)
  },[])
return {finalData, Loading};
} 