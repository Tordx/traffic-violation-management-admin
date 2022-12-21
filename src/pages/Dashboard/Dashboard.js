import React from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/Sidebar'
import sidebar_menu from '../../constants/sidebar-menu'
import '../styles.css'

export default function Dashboard() {
  return (

<div className='dashboard-container'>
  <title>Dashboard</title>
      <SideBar menu={sidebar_menu} />
      
      
      <div className='dashboard-body'>
      <DashboardHeader
      title = 'Dashboard'
      />
        <div className='dashboard-content-container'>
        <div className='dashboard-content-header1'>
          <img
          width={450} height = {300}
          src='https://img.freepik.com/free-vector/construction-yellow-black-stripes-background_1017-37281.jpg?w=2000'

          />
            <h1>Thanks for stopping by!</h1>
            <h4>We are currently developing this page.</h4>
          </div>
        </div>
      </div>
    </div>
  )
}