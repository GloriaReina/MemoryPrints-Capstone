import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserManagers";
import "./Login.css"


export default function Login({setIsLoggedIn}) {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <>
    <div className='hero-container'>
      <video src='/video/video-1.mp4' autoPlay loop muted />
      <h4> THE JOURNEY AWAITS</h4>
      <h3>What are you waiting for?</h3>
      <div className="login-container">
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button className='btn--outline'>Login</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
    </div>
    </>
  );
}