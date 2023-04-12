import React , {useState, useEffect} from 'react';
import './login.css';
import './style.css';
import whitelogo from '../../assets/images/tvmlogo.png';
import axios from "axios";
import PouchDB from "pouchdb"
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import allActions from '../../ReduxAction/indexAction';
// import uuid from 'react-native-uuid';

export default function Login(props) {


  const remoteDBTrafficAccountUserAdmin = new PouchDB('https://root:root@database.vidarsson.online/z_user')
  const dispatch = useDispatch()

      // const id = uuid.v4();
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [data, setData] = useState('')
  const [navigate, setNavigate] = React.useState(false)
  const [popup, setPopup] = React.useState(false)


  if(navigate){
    return <Navigate to= "/citation"/>
  }

  const LoginData = async () => {
    var result = await remoteDBTrafficAccountUserAdmin.allDocs({
      include_docs: true,
      attachments: true
    });
    
    if (result.rows) {
      let modifiedArr = result.rows.map(function(item) {
        return item.doc
      });
      let filterRole = modifiedArr.filter((item) => {
        return item.Role === 'Admin'
      })
      
      if (filterRole.length > 0) { // check if filterRole array has any items
        let filteredData = filterRole.filter(item => {
          return item.UserName === username.toLowerCase()
        });
        if (filteredData.length > 0) { // check if filteredData array has any items
          const newusername = filteredData[0].UserName
          const newpasscode = filteredData[0].Password
          
          if (newusername === username && newpasscode === passcode) {
            dispatch(allActions.userAction.setUser(filteredData[0]))
            setNavigate(true)
          } else {
            alert('Credentials do not match')
            console.log("yeyeyeyeye")
          }
        } else {
          alert('User not found')
          console.log("User not found")
        }
      } else {
        alert('You do not have access')
        console.log(filterRole)
      }
    }
  }

  return (
    <div className='login-container' id='container-colors'>
      <title>Login</title>
        <div className='login-box' >
            <img
            className='logo-size'
            src={whitelogo}

            />
            <h1> ADMIN DASHBOARD </h1>
            <input className='input-box' type = 'name' placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
            <input className='input-box' type = 'password' placeholder='password' onChange={(e) => setPasscode(e.target.value)} />
            {/* <button onClick={setPopup(true)}/> */}
            {/* href = {'/dashboard'} */}
                <a className='login-text login-button' onClick = {LoginData} >LOG IN</a>
        </div>
    </div>
  )
};