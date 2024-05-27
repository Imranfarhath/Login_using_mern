import { useEffect, useState } from "react";

function Advise()
{
    const [count,setcount]=useState(0);
    const [advise,setadvise]=useState("Get advise by pressing below button");
    async function handlesubmit(){
        const res=await fetch("https://api.adviceslip.com/advice");
        console.log(res);
        const data=await res.json();
        console.log(data);
        setadvise(data.slip.advice);
        setcount(count+1);
    }
    useEffect(()=>{
        handlesubmit();
    },[])
    return(
        <>
            <h3>{advise}</h3>
            <button onClick={handlesubmit}>Get Advise</button>
            <p>You read {count} advise from our page</p>
        </>
    )
}
export default Advise;