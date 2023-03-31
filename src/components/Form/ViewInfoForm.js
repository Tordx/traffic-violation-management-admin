import React, { useEffect, useState } from "react";
import '../../App.css'
import { useSelector } from "react-redux";
import PouchDB from 'pouchdb';
import { useNavigate } from "react-router-dom";


const ViewInfoForm = ({}) => {

  const remoteDBViolation = new PouchDB('https://root:root@database.vidarsson.online/z_violation')

  const navigate = useNavigate();

  const currentUser = useSelector(state => state.currentUser)
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drivername, setDrivername] = useState(currentUser.user.DriverName);
  const [refnum, setRefNum] = useState(currentUser.user.refNum);
  const [driveraddress, setDriverAddress] = useState(currentUser.user.DriverAddress);
  const [licensenumber, setLicenseNumber] = useState(currentUser.user.LicenseNumber);
  const [licenseplate, setLicensePlate] = useState(currentUser.user.LicensePlate);
  const [vehicletype, setVehicleType] = useState(currentUser.user.VehicleType);
  const [status, setStatus] = useState(currentUser.user.Status);
  const [others, setOthers] = useState('');;
  const [dates, setDates] = useState(currentUser.user.date);
  const [fullname, setFullName] = useState(currentUser.user.mvfileNumber);
  const [contactnumber, setContactNumber] = useState(currentUser.user.ContactNumber);
  const [id, setId] = useState(currentUser.user._id);
  const [rev, seRev] = useState(currentUser.user._red);
  const [image, setImage] = useState(''); // not yet implemented as image upload was set as file for default in the recent update.

  const handleSubmit = async(e) => {
      navigate('/history')
  };

   return (
    <div className="formContainer">
      {loading && 
        <div className="loading-modal">
          <div className="loading-content">
            <div className="spinner"></div>
              <p>Loading...</p>
          </div>
        </div>}
        {/* <Header/> */}
  <div className="formWrapper">
    <div className="LabelWrapper">
      <div className="formlogo">
        </div>
        <h1 className="pageTitle">TRANSACTION INFO</h1>
        <div className="FootForm">
          <div className="long-label">
            <label htmlFor="name">Driver Name <span className="required">*</span></label>
            <input className='input-box'disabled placeholder="E.g. Juan Dela Cruz" required type="text" name="fullName" value={drivername} onChange={(e) => setDrivername(e.target.value)} />
          </div>
          <div className="HeadForm">
            
          <div className="row-label" >
            <div className="id-generated">
              <div className="id-generated-wraps">
              <label htmlFor="batchCode">DATE OF APPREHENSION</label>
              <input className='input-box' disabled placeholder= {dates} required type="text" name="batchCode"onChange={(e) => setDates(e.target.value)}/>
                </div>
                <div className="id-generated-wraps">
                  <label htmlFor="userid">REFERENCE NUMBER</label>
                  <input className='input-box' disabled placeholder= {refnum} required type="text" name="userid" onChange={(e) => setRefNum(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="HeadForm">
          <div className="row-label">
            <label htmlFor="specDis">MV FILE NUMBER <span className="required">*</span></label>
            <input className='input-box'disabled placeholder="E.g. Leg Trauma,…" required  type="text" name="specDis" value={fullname} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="row-label">
            <label htmlFor="causeOfDisability">DRIVER ADDRESS <span className="required">*</span></label>
            <input className='input-box'disabled placeholder="e.g. Accident,…" required type="text" name="causeOfDisability" value={driveraddress} onChange={(e) => setDriverAddress(e.target.value)} />
          </div>
          </div>
        </div>
        <div className="row-label">
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="occupation">CONTACT NUMBER <span className="required">*</span></label>
              <input className='input-box'disabled placeholder="E.g. Occupation,…" required  type="text" name="Occupation" value={contactnumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="sss_id">LICENSE NUMBER</label>
              <input className='input-box' disabled placeholder="das" type="text" name="sss_id" value={licensenumber} onChange={(e) => setLicenseNumber(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gsis">LICENSE PLATE</label>
              <input className='input-box' disabled placeholder="das" type="text" name="gsis" value={licenseplate} onChange={(e) => setLicensePlate(e.target.value)} />
              </div>
            <div className="row-label">
              <label htmlFor="pagibig">VEHICLE TYPE</label>
              <input className='input-box' disabled placeholder="das" type="text" name="pagibig" value={vehicletype} onChange={(e) => setVehicleType(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="philhealth">BILLING STATUS</label>
              <input className='input-box' disabled placeholder="das" required  type="text" name="philhealth" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="others">Others</label>
              <input className='input-box'disabled placeholder="das" type="text" name="others" value={others} onChange={(e) => setOthers(e.target.value)} />
            </div>
          </div>
         <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
            </label>
            <input className='input-box' required style={{ display: "none" }} type="file" id="img" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          <div className="addPortrait">
            <label htmlFor="file">
            </label>
            <input className='input-box' required style={{ display: "none" }}  type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf, .xlsx, .csv, .txt, .doc, .xls, .png, .jpeg, .jpg, .docx, .odt"/>
          </div>
          </div>
          <button className='input-box' disabled={loading} onClick = {handleSubmit}>CLOSE FORM</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}

        </div>
      </div>
    </div>
  );
};

export default ViewInfoForm;
