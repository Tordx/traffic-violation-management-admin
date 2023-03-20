import React, {useState} from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import '../styles.css'
import '../../App.css'
import PouchDB from 'pouchdb';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';

export default function AddAccount() {

  const [username, setUsername] = React.useState('');
  const [passowrd, setPassword] = React.useState('');
  const [rank, setRank] = React.useState('');
  const [navigate, setNavigate] = React.useState(false)
  const [addError, setAddError] = React.useState(false)

  if(navigate){return <Navigate to= "/users"/>}


  const remoteDBTrafficAccountAdmin = new PouchDB('http://admin:admin@192.168.0.192:5984/z_users')

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length === 0 || passowrd.length === 0 || rank.length === 0){
      alert('Unable to add account, Please fill all fields')

    } else

    var NewUser = {

      _id: uuid(),
      Username: username,
      Password: passowrd,
      Officer: rank,
      Citation: 0

    } 
    await remoteDBTrafficAccountAdmin.put(NewUser)
    .then(function () {
      setNavigate(true)
      alert('New user Added')
    }).catch(function (err) {
      console.log(err);
    });
    
  }



  return (
   
    <div className="dashboard-container">
    <title></title>
    <SideBar menu={sidebar_menu} />
    <div className='dashboard-body'>
      <DashboardHeader title="Add Account" />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
        </div>
        <form className="input-conatiner" onSubmit={handleSubmit}>
            <input
              className='input-text'
              type="text"
              id="Username"
              placeholder = 'Username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <input
             className='input-text'
             placeholder='Password'
              type="text"
              id="Password"
              value={passowrd}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <input
               className='input-text'
              type="text"
              id="Rank"
              placeholder='Rank'
              value={rank}
              onChange={(event) => setRank(event.target.value)}
            />
            <br />
            <button className='add-button login-text' type="submit">Create Account</button>
        </form>
      </div>
    </div>
  </div>
  )
}
