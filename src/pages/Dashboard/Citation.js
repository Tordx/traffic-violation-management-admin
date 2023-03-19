import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import PouchDB from 'pouchdb';
import '../styles.css';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import Modal from '../../utils/modal';

function Citation () {
    const [search, setSearch] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [text, setText] = useState('');
    const [data, setData] = useState('');
    const [show, setShow] = useState(false);
    // const [show, setShow] = useState(false);

    useEffect(() => {
        setPagination(calculateRange(pagination, 5));
        setContent(sliceData(pagination, page, 5));
        newdata()
    }, [page]);



    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };


    const newdata = async() => {
        
     const remoteDBViolation = new PouchDB('http://admin:admin@192.168.0.192:5984/z_violation')
        console.log('remoteDBViolation');
        console.log(remoteDBViolation);
        var result = await remoteDBViolation.allDocs({
            include_docs: true,
            attachments: true
          });
          if(result.rows){
                let modifiedArr = result.rows.map(function(item){
                return item.doc
          });
                let filteredData = modifiedArr.filter(item => {
                return item.Status;
          });
          if (filteredData) {
            let newFilterData = filteredData.map(item => {
              return item;
            });
            setContent(newFilterData)

          }
    }
}

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value) {
            let search_results = content.filter((item) =>
                (new RegExp(search, 'i').test(item.refNum) ||
                new RegExp(search, 'i').test(item.DriverName) ||
                new RegExp(search, 'i').test(item.ContactNumber)
                )
            );
            setContent(search_results);
        }
        else if (event.target.value == '') {
            __handleSearch()
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setContent(sliceData(content, new_page, 5));
    }

    const StatusChange = async() => {

        const remoteDBViolation = new PouchDB('http://admin:admin@192.168.0.192:5984/z_violation')
        console.log('dsdsd')
        console.log(data)
        console.log('dsdsd')
        remoteDBViolation.get(data._id)
        .then(function(doc) {
            return remoteDBViolation.put({
                _id: doc._id,
              ...doc,
              ORnumber : text,
              Status: "Paid"
            });
          }).then(function(response) {
            console.log('response')
            console.log(response)
            setContent(response)
          }).catch(function (err) {
            console.log(err);
          });
          await newdata()
          window.location.reload(true)
    }

   
    return(
        <div className='dashboard-content'>
            
            <Modal show={show} handleClose={hideModal}>
            <text className='text-or-inupt'>ENTER THE OR NUMBER</text>
            <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className = "my-input"
            />
            <div className='dashboard-or-inupt'>
                <button className='button-or-inupt' onClick={() => {StatusChange()}}>yes</button>
                <button className='button-or-inupt' onClick={() => {hideModal()}}  >no</button>
               
            </div>
        </Modal>
            <div className='dashboard-container'>
            <SideBar menu = {sidebar_menu}/>
            <div className='dashboard-body'>
            <DashboardHeader
            title = 'Apprehended Drivers'
            />
            
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Citation List</h2>
                    <div>
                    <button onClick = {newdata}>refresh</button>
                    <div className='dashboard-content-search'>'
                    
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={(item) => __handleSearch(item)} />
                    </div>
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
                    </thead>

                    {content.length !== 0 ?
                        <tbody>
                            {content.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators.refNum}</span></td>
                                    <td><span>{violators.DriverName}</span></td>
                                    <td><span>{violators.DriverAddress}</span></td>
                                    <td><span>{violators.ContactNumber}</span></td>
                                    <td><span>{violators.LicenseNumber}</span></td>
                                    <td><span>{violators.LicensePlate}</span></td>
                                    <td><span>{violators.VehicleType}</span></td>
                                    <button disabled={violators.Status === "Paid" ? true : false} onClick={() => {showModal() , setData(violators) }}>
                                    <td><span>{violators.Status}</span></td>
                                    </button>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
                {content.length !== 0 ?
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