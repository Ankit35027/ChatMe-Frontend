import React, { useState } from "react";
import "./SignUp.css"
import hideIcon from "../assets/hide.png"
import showIcon from "../assets/show.png"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [body, setBody] = useState({ username: "", password: "" });
    const [err,setError] = useState(null)
    const [show,setShow]=useState(false)
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    };
  
    const submit = async (e) => {
      e.preventDefault();
  
      const res = await fetch("http://localhost:3000/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.username,
          password: body.password
        }),
      });
  
      const data = await res.json();
      if(data.message!="Created Successfully"){
        setError(data.message)
      }else{
        setError("Success")
      }
      console.log(data);
    };
  
    return (
        <>
        {err && <h1 className="res">{err}</h1> }
      <div className="a">
        <h1>SignIn</h1>
        <form onSubmit={submit}>
          <label htmlFor="username">Username/Email:</label>
          <br />
          <input
            placeholder="Enter Your Username"
            type="text"
            id="username"
            name="username"
            value={body.username}
            onChange={handleChange}
            autoComplete="off"
          />
  
          <br />
             <br />
          <div>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            placeholder="Enter Your Password"
            type={show?"text":"password"}
            id="password"
            name="password"
            value={body.password}
            onChange={handleChange}
          /> 
          <img src={show ? showIcon:hideIcon} alt="" onClick={()=>{setShow(!show)}} />
          </div>
          <br />
          <br />
          <div className="btn">
          <button type="submit">SignIn</button>
          <button onClick={()=>{
            navigate("/Signup")
          }}>SignUp</button>
          </div>
        </form>
        
      </div>
      </>

    );
  }