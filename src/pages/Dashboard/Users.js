import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_users from '../../constants/all-users';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import PouchDB from 'pouchdb';

export default function Users() {

  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    //   setPagination(calculateRange(all_users, 5));
    //   setOrders(sliceData(all_users, page, 5));
      newdata()
  }, []);

  const newdata = async() => {
        
    const remoteDBViolation = new PouchDB('http://admin:admin@192.168.100.14:5984/account')
       console.log('remoteDBViolation');
       console.log(remoteDBViolation);
       console.log('remoteDBViolation');
       var result = await remoteDBViolation.allDocs({
           include_docs: true,
           attachments: true
         });
         if(result.rows){
             let modifiedArr = result.rows.map(function(item){
             return item.doc
         });
         console.log('modifiedArr')
         console.log(modifiedArr)
         setOrders(modifiedArr)
         console.log('modifiedArr')
   }
}

  // Search
  const __handleSearch = (event) => {
      setSearch(event.target.value);
      if (event.target.value !== '') {
          let search_results = orders.filter((item) =>
              
              item.first_name.toLowerCase().includes(search.toLowerCase()) ||
              item.last_name.toLowerCase().includes(search.toLowerCase()) ||
              item.id.toLowerCase().includes(search.toLowerCase())
              
          );
          setOrders(search_results);
      }
      else {
          __handleChangePage(1);
      }
  };

  // Change Page 
  const __handleChangePage = (new_page) => {
      setPage(new_page);
      setOrders(sliceData(all_users, new_page, 5));
  }

    return (

      <div className='dashboard-container'>
        <title>User Settings</title>
            <SideBar menu={sidebar_menu} />
      
      
        <div className='dashboard-body'>
        <DashboardHeader
            title = 'User Settings'
            />
        <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>User Status</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>USERNAME</th>
                        <th>PASSWORD</th>
                        <th>OFFICER</th>
                        <th>CITATION</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators._id}</span></td>
                                    <td><span>{violators.Username}</span></td>
                                    <td>
                                        
                                            <span>{violators.Password}</span>
                                    </td>
                                    <td>
                                        <div>
                                            {/* <img 
                                                src={violators.avatar}
                                                className='dashboard-content-avatar'
                                                alt={violators.first_name + ' ' +violators.last_name} /> */}
                                            <span>{violators.Officer}</span>
                                        </div>
                                    </td>
                                    <td><span>{violators.Citation}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
            </div>
            </div>
  )

}
