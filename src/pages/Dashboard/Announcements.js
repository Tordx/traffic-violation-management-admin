import React, {useState} from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import '../styles.css'
import '../../App.css'
import PouchDB from 'pouchdb';
import uuid from 'react-uuid';
import { Navigate } from 'react-router-dom';

export default function Announcements() {

  const [username, setUsername] = React.useState('');
  const [passowrd, setPassword] = React.useState('');
  const [rank, setRank] = React.useState('');
  const [navigate, setNavigate] = React.useState(false)

  if(navigate){
    return <Navigate to= "/users"/>
  }

  const remoteDBTrafficAccountAdmin = new PouchDB('http://admin:admin@192.168.0.191:5984/z_users')

  async function handleSubmit(event) {
    event.preventDefault();

   await remoteDBTrafficAccountAdmin.put({
      _id: uuid(),
      Username: username,
      Password: passowrd,
      Officer: rank,
      Citation: 0
    }).then(function (response) {
    }).catch(function (err) {
      console.log(err);
    });
    setNavigate(true)

  }

  return (
   
  <div className='dashboard-container'>     
    <title>Announcements</title>
      <SideBar menu={sidebar_menu} />
      
      
      <div className='dashboard-body'>
      <DashboardHeader
      title = 'Add Account'
      />
        <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
            <h2>Add Account</h2>
          </div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="Username">Username:</label>
      <input
        type="text"
        id="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <br />
      <label htmlFor="Password">Password:</label>
      <input
        type="text"
        id="Password"
        value={passowrd}
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <label htmlFor="Rank">Rank:</label>
      <input
        type="text"
        id="Rank"
        value={rank}
        onChange={event => setRank(event.target.value)}
      />  
      <br />
      <button type="submit">Create Account</button>
    </form>
        </div>
      </div>
    </div>
  )
}
