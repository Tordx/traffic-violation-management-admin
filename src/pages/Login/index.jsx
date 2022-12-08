import React from 'react';
import './login.css';
import './style.css';
import whitelogo from '../../assets/images/tvmlogo.png'

export default function Login(props) {
  return (
    <div className='login-container' id='container-colors'>
        <div className='login-box' >
            <img
            className='logo-size'
            src={whitelogo}

            />
            <h1> ADMIN DASHBOARD </h1>
            <input className='input-box' type = 'name' placeholder='username' />
            <input className='input-box' type = 'password' placeholder='password' />
                <a className='login-text login-button' href={props.href} onClick = {props.onClick} >LOG IN</a>
        </div>
    </div>
  )
};