import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_violators from '../../constants/all-violators';
import {calculateRange, sliceData} from '../../utils/table-pagination';

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

    useEffect(() => {
        setPagination(calculateRange(all_violators, 5));
        setOrders(sliceData(all_violators, page, 5));
    }, []);

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
        setOrders(sliceData(all_violators, new_page, 5));
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
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>DRIVER</th>
                        <th>VIOLATION</th>
                        <th>PENALTY</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((violators, index) => (
                                <tr key={index}>
                                    <td><span>{violators.id}</span></td>
                                    <td><span>{violators.date}</span></td>
                                    <td>
                                        <div>
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
                                    <td><span>{violators.violation}</span></td>
                                    <td><span>P{violators.penalty}</span></td>
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
        </div>
    )
}

export default Citation;