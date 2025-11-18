import React from"react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const [dat,useDat] = useState("")

    const navigate = useNavigate()
//     const f = async ()=>{
//     const data = await fetch("http://localhost:3000/dashboard",{
//         method:"GET",
//         credentials:"include"
//     })
//     useDat(data.json())
//     return dat
// }
    const handleClick=()=>{
        navigate("/signIn")
    }
    return(
        <>
        <h1> Welcome</h1>
        <button onClick={handleClick}>Lets 's Proceed</button>
        </>
    )
    
    

}
