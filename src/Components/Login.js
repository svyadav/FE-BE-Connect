import axios from "axios";
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import env from "../environment"
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';



const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [toggle,setToggle]= useState(false)
    const [message,setMessage]=useState("")
    const navigate=useNavigate()

    const handleLogin=async ()=>{
        setToggle(true)
        let res=await axios.post(`${env.apiurl}/users/signin`,{
            email,
            password
        })

        if(res.data.statusCode===200){
            setToggle(false)
            sessionStorage.setItem('token',res.data.token)
            // console.log(res.data)
            navigate("/dashboard")
        }
        else{
            setToggle(false)
            setMessage(res.data.message)
            setTimeout(()=>{
                setMessage("")

            },3000)
          
        }

    }
    return <>
    <div className="login-wrapper">
        <h1>Welcome to app</h1>
        <p>login to continue</p>
    </div>
    <div className="login-main-wrapper">
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
       
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
       
      </Form.Group>
      <Button variant="primary" onClick={()=>handleLogin()}>
        Submit
      </Button>
    </Form>
    {toggle?<Spinner animation="border" variant="primary" />:""}
    {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:""}
    </div>
    </>
}
export default Login