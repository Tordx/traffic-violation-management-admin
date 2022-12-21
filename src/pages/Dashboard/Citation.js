import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_violators from '../../constants/all-violators';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import PouchDB from 'pouchdb';
import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

function Citation () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_violators);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        // setPagination(calculateRange(all_violators, 5));
        // setOrders(sliceData(all_violators, page, 5));
        newdata()
    }, []);

    const newdata = async() => {
        
     const remoteDBViolation = new PouchDB('http://admin:1234@192.168.0.199:5984/violation')

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
                
                item._id.toLowerCase().includes(search.toLowerCase()) ||
                item.DriverName.toLowerCase().includes(search.toLowerCase()) ||
                item.DriverAddress.toLowerCase().includes(search.toLowerCase())
                
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
        setOrders(sliceData(orders, new_page, 5));
    }

    const sdssss = (violators) => {
        // console.log('dsdsd')
        // console.log(violators)
        // console.log('dsdsd')
       var data =  {...violators, status: "Not Paid"}
       const dasta = [...orders , data]
       console.log('data')
       console.log(data)
       console.log('data')
       console.log('dasta')
       console.log(dasta)
       console.log('dasta')
       setOrders(dasta)
    }
   

    return(
        <div className='dashboard-content'>
            <title>Citations</title>
            <div className='dashboard-container'>
            <SideBar menu = {sidebar_menu}/>
            <div className='dashboard-body'>
            <DashboardHeader
            title = 'Apprehended Drivers'
            />
            
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Citation List</h2>
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
<<<<<<< HEAD
                        <th>ID</th>
                        <th>DRIVER</th>
                        <th>DriverAddress</th>
                        <th>ContactNumber</th>
                        <th>LicenseNumber</th>
                        <th>LicensePlate</th>
                        <th>VehicleType</th>
                        <th>Status</th>
                        {/* <th>ContactNumber</th>
                        <th>LicenseNumber</th>
                        <th>LicensePlate</th> */}
                        {/* <th>VehicleType</th> */}
                        {/* <th>Violation</th> */}
=======
                        <th>REFERENCE NUMBER</th>          
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>DRIVER</th>
                        <th>PHONE NUMBER</th>
                        <th>VIOLATION</th>
                        <th>PENALTY</th>
>>>>>>> be42d3f3077b487e484f5161dafea70fcff392f5
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators._id}</span></td>
                                    <td><span>{violators.DriverName}</span></td>
                                    <td><span>{violators.DriverAddress}</span></td>
                                    <td><span>{violators.ContactNumber}</span></td>
                                    <td><span>{violators.LicenseNumber}</span></td>
                                    <td><span>{violators.LicensePlate}</span></td>
                                    <td><span>{violators.VehicleType}</span></td>
                                    <button onClick={() => {sdssss(violators)}}>
                                    <td><span>{violators.status}</span></td>
                                    </button>
                                    {/* <td> */}
                                        {/* <div>
                                            {violators.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : violators.status === 'Not Paid' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : violators.status === 'Expired' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
<<<<<<< HEAD
                                            <span>{violators.DriverAddress}</span>
                                        </div> */}
                                    {/* </td> */}
                                    {/* <td>
                                        <div> */}
                                        {/* <td><span>{violators.ContactNumber}</span></td> */}
                                            
                                        {/* </div>
                                    </td> */}
                                    {/* <td><span>{violators.ContactNumber}</span></td> */}
                                    {/* <td><span>{violators.LicensePlate}</span></td> */}
                                    {/* <td><span>{violators.VehicleType}</span></td> */}
                                    {/* <td><span>{violators.penalty}</span></td> */}
=======
                                            <span>{violators.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img 
                                                src={violators.avatar}
                                                className='dashboard-content-avatar'
                                                alt={violators.first_name + ' ' +violators.last_name} />
                                            <span>{violators.first_name} {violators.last_name}</span>
                                        </div>
                                    </td>
                                    <td><span>this</span></td>
                                    <td><span>{violators.violation}</span></td>
                                    <td><span>P{violators.penalty}</span></td>
>>>>>>> be42d3f3077b487e484f5161dafea70fcff392f5
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {/* {orders.length !== 0 ?
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
                } */}
            </div>
            </div>
            </div>
        </div>
    )
}

export default Citation;