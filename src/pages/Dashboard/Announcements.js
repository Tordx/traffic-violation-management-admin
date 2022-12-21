import React from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import '../styles.css'
import '../../App.css'

export default function Announcements() {
  return (
   
  <div className='dashboard-container'>     
    <title>Announcements</title>
      <SideBar menu={sidebar_menu} />
      
      
      <div className='dashboard-body'>
      <DashboardHeader
      title = 'Announcements'
      />
        <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
            <h2>Add Announcements</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
