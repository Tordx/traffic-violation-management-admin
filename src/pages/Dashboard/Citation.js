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
        setPagination(calculateRange(all_violators, 10));
        setOrders(sliceData(all_violators, page, 10));
        newdata()
    }, []);


    const newdata = async() => {
        
     const remoteDBViolation = new PouchDB('http://admin:admin@192.168.0.191:5984/z_violation')
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
                
            (new RegExp(searchTerm, 'i').test(item.refNum) ||
            new RegExp(searchTerm, 'i').test(item.DriverName) 
            )
                
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

    const TicketList = async(violators) => {

        const remoteDBViolation = new PouchDB('http://admin:admin@192.168.100.14:5984/violation')
        console.log('dsdsd')
        console.log(violators)
        console.log('dsdsd')
        remoteDBViolation.get(violators._id).then(function(doc) {
            return remoteDBViolation.put({
                _id: doc._id,
              ...doc,
              Status: "Paid"
            });
          }).then(function(response) {
            console.log('response')
            console.log(response)
            console.log('response')
            setOrders(response)
          }).catch(function (err) {
            console.log(err);
          });
          await newdata()
          window.location.reload(true)
          
    //    var data =  {...violators, status: "Paid"}
    //    const dasta = [...orders , data]
    //    console.log('data')  
    //    console.log(data)
    //    console.log('data')
    //    console.log('dasta')
    //    console.log(dasta)
    //    console.log('dasta')
    //    setOrders(dasta)
    }

   
    return(
        <div className='dashboard-content'>
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
                        <th>ID</th>
                        <th>DRIVER</th>
                        <th>Driver Address</th>
                        <th>Contact Number</th>
                        <th>License Number</th>
                        <th>License Plate</th>
                        <th>Vehicle Type</th>
                        <th>Status</th>
                        {/* <th>ContactNumber</th>
                        <th>LicenseNumber</th>
                        <th>LicensePlate</th> */}
                        {/* <th>VehicleType</th> */}
                        {/* <th>Violation</th> */}
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators.refNum}</span></td>
                                    <td><span>{violators.DriverName}</span></td>
                                    <td><span>{violators.DriverAddress}</span></td>
                                    <td><span>{violators.ContactNumber}</span></td>
                                    <td><span>{violators.LicenseNumber}</span></td>
                                    <td><span>{violators.LicensePlate}</span></td>
                                    <td><span>{violators.VehicleType}</span></td>
                                    <button disabled={violators.Status === "Paid" ? true : false} onClick={() => {TicketList(violators)}}>
                                    <td><span>{violators.Status}</span></td>
                                    </button>
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
                    null
                }
            </div>
            </div>
            </div>
        </div>
    )
}

export default Citation;