import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import SideBar from '../components/Sidebar'
import sidebar_menu from '../constants/sidebar-menu'
import './styles.css'
import '../App.css'

export default function Error404() {
  return (
   
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      
      
      <div className='dashboard-body'>
      <DashboardHeader
      
      />
        <div className='error-container'>
        <div className='error-box'>
            <img
            draggable = {false}
            width={350} height ={350}
            src='https://media.istockphoto.com/id/1149451413/vector/girl-lift-her-hands-with-confuse-face.jpg?s=612x612&w=0&k=20&c=Yp_Qi7p_OUJJS62QEWJp5YG_OhDwHDwGPHbYVFCZJ7M='
            />
            <h2 className='error-text' >There's nothing here</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
