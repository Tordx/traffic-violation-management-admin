import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import PouchDB from 'pouchdb';
import '../styles.css';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import Modal from '../../utils/modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import allActions from '../../ReduxAction/indexAction';
import { useNavigate } from 'react-router-dom';

function Citation () {

    const remoteDBViolation = new PouchDB('https://root:root@database.vidarsson.online/z_violation')

    const currentUser = useSelector(state => state.currentUser)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [search, setSearch] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [ornumber, setOrNumber] = useState('');
    const [violationdata, setViolationData] = useState([]);
    const [data, setData] = useState('');
    const [showornumbermodal, setShowOrNumberModal] = useState(false);
    const [showviolationmodal, setShowViolationModal] = useState(false);
    const [user, setUser] = useState(currentUser.user?.Role);

    console.log('content')
    console.log(content)
    console.log('content')

    // const [show, setShow] = useState(false);
    useEffect(() => {
        newdata()
    }, []);
    
    useEffect(() => {
        setPagination(calculateRange(pagination, 5));
        setContent(sliceData(pagination, page, 5));
    }, [page]);


    const ORshowModal = () => {
        setShowOrNumberModal(true);

    };

    const ORhideModal = () => {
        setShowOrNumberModal(false);
        setOrNumber('')
    };
    const ViolationshowModal = () => {
        setShowViolationModal(true);

    };

    const ViolationhideModal = () => {
        setShowViolationModal(false);
        setViolationData([])
    };


    const newdata = async() => {
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
            
            if(user === "Admin") {
                let admindata = newFilterData.filter((item) => item.Status === "Unpaid");
                setContent(admindata)
            }else{
                let admindata = newFilterData.filter((item) => item.Status !== "Close");
                setContent(admindata)

            }
          }
    }
}
    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value) {
            let search_results = content.filter((item) =>
                (new RegExp(event.target.value, 'i').test(item.refNum) ||
                new RegExp(event.target.value, 'i').test(item.DriverName) ||
                new RegExp(event.target.value, 'i').test(item.ContactNumber)
                )
            );
            setContent(search_results);
        }
        else if (event.target.value == '') {
            newdata()
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setContent(sliceData(content, new_page, 5));
    }

    const StatusChange = async() => {

        const remoteDBViolation = new PouchDB('https://root:root@database.vidarsson.online/z_violation')
        remoteDBViolation.get(data._id)
        .then(function(doc) {
            return remoteDBViolation.put({
                _id: doc._id,
              ...doc,
              ORnumber : ornumber,
              Status: "Paid"
            });
          }).then(function(response) {
            newdata()
          }).catch(function (err) {
            console.log(err);
          });
          ORhideModal()
    }

    const toedit = (violators) => {
        dispatch(allActions.userAction.setUser(violators)) 
        navigate('/editform')
    }

    const seeviolation = (violators) => {
        setViolationData(violators.Violationdata)
        // dispatch(allActions.userAction.setUser(violators)) 
        // navigate('/editform')
    }

   
    return(
        <div className='dashboard-content'>

           <Modal show={showviolationmodal} handleClose={ViolationhideModal}>
                <text className='text-or-inupt'>Violation List</text>
                <div>
                {violationdata.map(item => (
                    <p key={item}>{item}</p>
                ))}
                </div>
                <div className='dashboard-or-inupt'>
                    {/* <button className='button-or-inupt' onClick={() => {StatusChange()}}>yes</button> */}
                    <button className='button-or-inupt' onClick={() => {ViolationhideModal()}}  >Close</button>
                
                </div>
           </Modal>
            
            <Modal show={showornumbermodal} handleClose={ORhideModal}>
            <text className='text-or-inupt'>ENTER THE OR NUMBER</text>
            <input
            type="text"
            value={ornumber}
            onChange={e => setOrNumber(e.target.value)}
            className = "my-input"
            />
            <div className='dashboard-or-inupt'>
                <button className='button-or-inupt' onClick={() => {StatusChange()}}>yes</button>
                <button className='button-or-inupt' onClick={() => {ORhideModal()}}  >no</button>
               
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
                    {/* <button onClick={newdata}>Refresh</button> */}
                    <div>
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
                        <th>DATE OF APPREHENTION</th>
                        <th>ID</th>
                        <th>DRIVER</th>
                        <th>Driver Address</th>
                        <th>Contact Number</th>
                        <th>License Number</th>
                        <th>License Plate</th>
                        <th>Vehicle Type</th>
                        <th>Violation Data</th>
                       { user === "Admin" ?  <th>Status</th> : <th>EDIT INFO</th> }
                    </thead> 

                    {content.length !== 0 ?
                        <tbody>
                            {content.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators.date} / {violators.time}</span></td>
                                    <td><span>{violators.refNum}</span></td>
                                    <td><span>{violators.DriverName}</span></td>
                                    <td><span>{violators.DriverAddress}</span></td>
                                    <td><span>{violators.ContactNumber}</span></td>
                                    <td><span>{violators.LicenseNumber}</span></td>
                                    <td><span>{violators.LicensePlate}</span></td>
                                    <td><span>{violators.VehicleType}</span></td>
                                    <td><button onClick={() => {ViolationshowModal() , seeviolation(violators)}} >{violators.Violationdata}</button></td>
                                   { user === "Admin" ? (<button disabled={violators.Status === "Paid" ? true : false} onClick={() => {ORshowModal() , setData(violators) }}>
                                    <td><span>{violators.Status}</span></td>
                                    </button>) : (<button  href = '/editform' onClick={() => toedit(violators) }>
                                     EDIT
                                     <td><span>{violators.Status}</span></td>
                                    </button>) }
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