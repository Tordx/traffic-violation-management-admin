import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, Navigate , Switch} from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Citation from './pages/Dashboard/Citation';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Dashboard/Users';
import Announcements from './pages/Dashboard/AddAccount';
import Login from './pages/Login';
import Error404 from './pages/error404';
import AddAccount from './pages/Dashboard/AddAccount';
import EditInforForm from './components/Form/EditInfoForm';
import History from './pages/Dashboard/History';
import ViewInfoForm from './components/Form/ViewInfoForm';

function App () {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return(
    <Router>
      
      <div className='dashboard-container'>
              <div className='dashboard-body'>
                <Routes> 
                  <Route path = "/" element = {<Login />}/>
                  <Route path="*" element={<Error404/>} />
                  <Route exact path='/dashboard' element = {<Dashboard/>}/>
                  <Route exact path='/citation' element = {<Citation/>}/>
                  <Route exact path='/history' element = {<History/>}/>
                  <Route exact path='/users' element = {<Users/>}/>
                  <Route exact path = '/add-users' element = {<AddAccount/>}/>
                  <Route exact path = '/editform' element = {<EditInforForm/>}/>
                  <Route exact path = '/viewform' element = {<ViewInfoForm/>}/>
                </Routes>
                
              </div>     
      </div>

    </Router>
  )
}

export default App;