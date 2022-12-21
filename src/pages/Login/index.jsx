import React , {useState, useEffect} from 'react';
import './login.css';
import './style.css';
import whitelogo from '../../assets/images/tvmlogo.png';
import axios from "axios";
import PouchDB from "pouchdb"
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
// import uuid from 'react-native-uuid';

export default function Login(props) {


  const remoteDBTrafficAccountAdmin = new PouchDB('http://admin:1234@192.168.0.199:5984/trafficaccountadmin')

      // const id = uuid.v4();
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [data, setData] = useState('')
  const [navigate, setNavigate] = React.useState(false)
  const [popup, setPopup] = React.useState(false)


  if(navigate){
    return <Navigate to= "/dashboard"/>
  }

//  if(popup){
//  return <Popup trigger={popup}>
//   <h3>My popup</h3>
//   <p>aler alert</p>
//   </Popup>
//  }

   const LoginData = async () => {

        // if (adminid.length == 0) {
        //     ToastAndroid.show('Please input your Student ID', ToastAndroid.SHORT)
        // }
        // if (passcode.length == 0) {
        //     ToastAndroid.show('Please input your Birthdate', ToastAndroid.SHORT)
        // }

        var result = await remoteDBTrafficAccountAdmin.allDocs({
            include_docs: true,
            attachments: true
          });
          if(result.rows){
              let modifiedArr = result.rows.map(function(item){
              return item.doc
          });
          let filteredData = modifiedArr.filter(item => {
              return item.passcode === passcode
            });
            const newusername = filteredData[0].username
            const newpasscode = filteredData[0].passcode
            
            if(newusername === username && newpasscode === passcode){
              setNavigate(true)
            }else{
           console.log("yeyeyeyeye")
            }
            // if(filteredData) {
            //     let newFilterData = filteredData.map(item => {
            //         return item
            //     })
                // setData(newFilterData)
                // if(newFilterData.length === 0){
                //   setNavigate(false)
                // }else{
                //   setNavigate(true)
                // }
             
                // console.log('newusername')
                // console.log(newusername)
                // console.log('newusername')
                // console.log('newpasscode')
                // console.log(newpasscode)
                // console.log('newpasscode')

                // dispatch(setStudentInfo(newFilterData))
                // const Username = newFilterData[0].username;
                // const Passcode = newFilterData[0].passcode
                // try {
                //     var Newlog = {
                //      _id: 'fdfdfdfdfdf',
                //      Username : username,
                //      Passcode : passcode,
                //     }
                //     remoteDBTrafficAccountAdmin.put(Newlog)
                //     .then((response) =>{
                //       console.log(response)
                //     })
                //     .catch(err=>console.log(err))
                    
                //   } catch (error) {
                //    console.log(error)
                //   }
                
                // if((username == Username ) && (passcode == Passcode) ){
                //     navigation.navigate('AdminHomeScreen')

                //    }else{
                //      Alert.alert('StudentID and Birthdate not match')
            //     //    }
            // }else{
            //  console.log('done')
            // }
            
        }
       
      }

  return (
    <div className='login-container' id='container-colors'>
      <title>Login</title>
        <div className='login-box' >
            <img
            className='logo-size'
            src={whitelogo}

            />
            <h1> ADMIN DASHBOARD </h1>
            <input className='input-box' type = 'name' placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
            <input className='input-box' type = 'password' placeholder='password' onChange={(e) => setPasscode(e.target.value)} />
            {/* <button onClick={setPopup(true)}/> */}
            {/* href = {'/dashboard'} */}
                <a className='login-text login-button' href = '/dashboard' onClick = {LoginData} >LOG IN</a>
        </div>
    </div>
  )
};