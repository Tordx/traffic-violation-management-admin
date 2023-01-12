import React from 'react';

import './styles.css';

function DashboardHeader (props) {
    return(
        <div className='dashbord-header-container'>
              <h1 className='header-title' >{props.title}</h1>
        </div>
    )
}

export default DashboardHeader;