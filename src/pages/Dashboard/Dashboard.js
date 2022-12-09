import React from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import '../styles.css'

export default function Dashboard() {
  return (

<div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      
      
      <div className='dashboard-body'>
      <DashboardHeader
      title = 'Dashboard'
      />
        <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
            <h2>Contents</h2>
          </div>
        </div>
      </div>
    </div>
  )
}