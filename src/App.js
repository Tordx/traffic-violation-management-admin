import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate , Switch} from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Citation from './pages/Dashboard/Citation';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Dashboard/Users';
import AdminSettings from './pages/Dashboard/Admin-Settings';
import Login from './pages/Login';
import Error404 from './pages/error404';

function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return(
    <Router>
      
      <div className='dashboard-container'>
              <div className='dashboard-body'>
                <Routes> 
                  <Route path = "/login" element = {<Login />}/>
                  <Route path="*" element={<div>Error</div>} />
                  <Route exact path='/dashboard' element = {<Dashboard/>}/>
                  <Route exact path='/citation' element = {<Citation/>}/>
                  <Route exact path='/users' element = {<Users/>}/>
                  <Route exact path = '/admin-settings' element = {<AdminSettings/>}/>
                </Routes>
                
              </div>     
      </div>

    </Router>
  )
}

export default App;