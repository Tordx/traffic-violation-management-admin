import React, { useEffect, useState } from "react";
// import addPortrait from "../img/userIcon.png";
// import DocUpload from '../img/document-file-page-paper-sheet-up-upload-icon-3.png';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";
// import Header from "../components/Header";
// import MDSW from '../img/DSWD-Logo.png'
import '../../App.css'


const EditInfoForm = ({}) => {


  
  const date = new Date();
  const year = date.getFullYear();
  const createdate = date.getDate()
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userID, setUserID] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [typeOfDisability, setTypeOfDisability] = useState('');
  const [causeOfDisability, setCauseOfDisability] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [sss, setSSS] = useState('');
  const [gsis, setGSIS] = useState('');
  const [pagibig, setPagibig] = useState('');
  const [psn, setPSN] = useState('');
  const [philhealth, setPhilHealth] = useState('');
  const [dl, setDL] = useState('');
  const [others, setOthers] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [guardian, setGuardian]= useState('');
  const [batchCode, setBatchCode] = useState(year);
  const [disabilityCode, setDisabilityCode] = useState('');
  const [physician, setPhysician] = useState('');
  const [license, setLicense] = useState('');
  const [processingOfficer, setProcessingOfficer] = useState('');
  const [approvingOfficer, setApprovingOfficer] = useState('');
  const [encoder, setEncoder] = useState('');
  const [specDis, setSpecDis] = useState('');
  const [occupation, setOccupation] = useState('');
  const [emergencyContactPerson, setEmergencyContactPerson] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [image, setImage] = useState(''); // not yet implemented as image upload was set as file for default in the recent update.
  const [file, setFile] = useState(null);
//   const navigate = useNavigate();



  const generateNumbers = () => {
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    setUserID(randomNumber.toString());
  };

  useEffect(() => {
    generateNumbers()
  },[])

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

        if (
          fullName.length === 0 ||
          email.length === 0 ||
          phoneNumber.length === 0 ||  
          birthDate === '' || 
          sex === 'Select Sex' || 
          address.length === 0 || 
          typeOfDisability.length === 0 || 
          causeOfDisability.length === 0 || 
          highestEducation === 'Select' || 
          employmentStatus ===  'Select'|| 
          batchCode.length === 0 || 
          disabilityCode.length === 0 ||
          image.length === 0) {
    alert('Please fill in all the required fields')
    setLoading(false);
    }else {
    
    try {
      // Create user account
      const res = await createUserWithEmailAndPassword(auth, email, userID);
      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${fullName + date}`);

      // Upload profile photo to Firebase Storage
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: fullName,
              photoURL: downloadURL, //   <----- this cause an error in which the admin itself changes its own photo, if uplading new one.
            });                                

            
            
            // Create user document in Firestore database
            const userDocRef = doc(db, "users", res.user.uid);
            await setDoc(userDocRef, {
              uid: res.user.uid,
              date: createdate,
              displayName: fullName,
              FullName:  fullName,
              userID: userID,
              email: email,
              password: email,
              batchCode: batchCode,
              disabilityCode: disabilityCode,
              phoneNumber: phoneNumber,
              landlineNumber: landlineNumber,
              birthDate: birthDate,
              sex: sex,
              address: address,
              typeOfDisability: typeOfDisability,
              causeOfDisability: causeOfDisability,
              highestEducation: highestEducation,
              employmentStatus: employmentStatus,
              Mother: mother,
              Father: father,
              Guardian: guardian,
              Physician: physician,
              License: license,
              ProcessingOfficer: processingOfficer,
              ApprovingOfficer: approvingOfficer,
              Encoder: encoder,
              sss: sss,
              gsis: gsis,
              pagibig: pagibig,
              psn: psn, 
              philhealth: philhealth, 
              dl: dl, 
              gsis: gsis,
              pagibig: pagibig, 
              psn: psn, 
              philhealth: philhealth,
              occupation: occupation,
              others: others,
              specDis: specDis,
              emergencyContactPerson: emergencyContactPerson,
              emergencyContactNumber: emergencyContactNumber,
              Status : "Deactivated",
              userType: "app-account",
              photoURL: downloadURL
            });
            console.log(userDocRef)
            console.log('this was read too')
            // Create empty user chats document in Firestore database
            await setDoc(doc(db, "userChats", res.user.uid), {});
            // Navigate to home page
            localStorage.setItem("formSubmitted", "true");
            navigate("/register/Submitted");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
            alert('Successfully added user')
          }
        });
        
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
    
}

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
      <form onSubmit={handleSubmit}>
      <div className="formlogo">
          {/* <img src={MDSW} width = {150} draggable = {false}/> */}
          {/* <img src={MOL} width = {93} draggable = {false}/> */}
        </div>
        <h1 className="pageTitle">Application form</h1>
        
        <p>ID REFERENCE NUMBER</p>
        <div className="FootForm">
          <div className="long-label">
            <label htmlFor="name">Full Name <span className="required">*</span><h6 class="tooltiptext">section required</h6></label>
            <input className='input-box' placeholder="E.g. Juan Dela Cruz" required type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="HeadForm">
            
          <div className="row-label" >
            <div className="id-generated">
              <div className="id-generated-wraps">
              <label htmlFor="batchCode">Batch code</label>
              <input className='input-box' disabled placeholder= {batchCode} required type="text" name="batchCode"onChange={(e) => setBatchCode(e.target.value)}/>
                </div>
                <div className="id-generated-wraps">
                  <label htmlFor="userid">User ID</label>
                  <input className='input-box' disabled placeholder= {userID} required type="text" name="userid" onChange={(e) => setUserID(e.target.value)} />
                </div>
                {/* <div className="id-generated-wraps">
                  <label htmlFor="disabilityCode">disablity code <span className="required">*</span><h6 class="tooltiptext">section required</h6></label>
                    <select required type="text" name="disabilityCode" value={disabilityCode} onChange={(e) => setDisabilityCode(e.target.value)}>
                      <option value="Select">Select</option>
                      <option value="VI">101 - Vision Impairment</option>
                      <option value="DHH">102 - Deaf or hard of hearing</option>
                      <option value="MHC">103 - Mental health conditions</option>
                      <option value="ID">104 -  Intellectual disability</option>
                      <option value="ABI">105 - Acquired brain injury</option>
                      <option value="ASD">106 - Autism spectrum disorder</option>
                      <option value="PD">107 -  Physical disability</option>
                    </select>
                </div> */}
              </div>
            </div>
            {/* <div className="row-label">
              <h3>
                <label>NOTE: user password is set to userid by default, once approved, please change your password immediately.</label>
              </h3>
              </div> */}
          </div>
          {/* <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input placeholder="example@example.com" required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Phone Number <span className="required">*</span></label>
              <input placeholder="09xxxxxxxxx" required type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Landline Number</label>
              <input placeholder="(075) 123 1234" type="tel" name="landlineNumber" value={landlineNumber} onChange={(e) => setLandlineNumber(e.target.value)} />
            </div>
          </div> */}
          {/* <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="birthday">Birth Date <span className="required">*</span></label>
              <input required type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gender">Sex/Gender <span className="required">*</span></label>
              <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div> */}
          {/* <div className="long-label">
            <label htmlFor="address">Address <span className="required">*</span><h6 class="tooltiptext">section required</h6></label>
            <input placeholder="Barangay, Town/City" required name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div> */}
          <div className="HeadForm">
          {/* <div className="row-label">
                  <label htmlFor="typeOfDisability">Type of  Disability <span className="required">*</span></label>
                    <select required type="text" name="typeOfDisability" value={typeOfDisability} onChange={(e) => setTypeOfDisability(e.target.value)}>
                      <option value="Select">Select</option>
                      <option value="Vision Impairment">Vision Impairment</option>
                      <option value="Deaf or hard of hearing">Deaf or hard of hearing</option>
                      <option value="Mental health conditions">Mental health conditions</option>
                      <option value="Intellectual disability">Intellectual disability</option>
                      <option value="Acquired brain injury">Acquired brain injury</option>
                      <option value="Autism spectrum disorder">Autism spectrum disorder</option>
                      <option value="Physical disability">Physical disability</option>
                    </select>
                </div> */}
          <div className="row-label">
            <label htmlFor="specDis">Specificy Disability <span className="required">*</span></label>
            <input className='input-box' placeholder="E.g. Leg Trauma,…" required  type="text" name="specDis" value={specDis} onChange={(e) => setSpecDis(e.target.value)} />
          </div>
          <div className="row-label">
            <label htmlFor="causeOfDisability">Cause of Disability <span className="required">*</span></label>
            <input className='input-box' placeholder="e.g. Accident,…" required type="text" name="causeOfDisability" value={causeOfDisability} onChange={(e) => setCauseOfDisability(e.target.value)} />
          </div>
          </div>
          {/* <div className="long-label">
            <label htmlFor="status">Highest Educational Attainment <span className="required">*</span></label>
            <select required type="text" name="highestEducation" value={highestEducation} onChange={(e) => setHighestEducation(e.target.value)}>
                  <option value="Select">Select</option>
                  <option value="Graduate/Masteral/Doctorate">Graduate/Master's/Doctor's</option>
                  <option value="Undergraduate/Vocational/Bacherlor's">Undergraduate/Vocational/Bacherlor's</option>
                  <option value="Senior Highschool">Senior Highschool</option>
                  <option value="Junior Highschool">Junior Highschool</option>
                  <option value="Elementary">Elementary</option>
                  <option value="N/A">Not Applicable</option>
                </select>
          </div> */}
        </div>
        <div className="row-label">
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="occupation">Occupation <span className="required">*</span></label>
              <input className='input-box' placeholder="E.g. Occupation,…" required  type="text" name="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            {/* <div className="row-label">
              <label htmlFor="status">Status of Employment <span className="required">*</span></label>
              <select required type="text" name="Status" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
              <option value="Select">Select</option>
                <option value="Employed">Employed</option>
                <option value="Self Employe">Self Employed</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Freelancer/Contractor">Freelancer/Contractor</option>
                <option value="Temporary employed">Temporary employed</option>
                <option value="Intern/Apprentice">Intern/Apprentice</option>
                <option value="Seasonal employee">Seasonal employee</option>
                <option value="Student/Trainee">Student/Trainee</option>
                <option value="Volunteer/Non-profit worker">Volunteer/Non-profit worker</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
              </select>
            </div> */}
          </div>
          <p>ID REFERENCE NUMBER</p>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="sss_id">SSS ID</label>
              <input className='input-box' type="text" name="sss_id" value={sss} onChange={(e) => setSSS(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gsis">GSIS ID</label>
              <input className='input-box' type="text" name="gsis" value={gsis} onChange={(e) => setGSIS(e.target.value)} />
              </div>
            <div className="row-label">
              <label htmlFor="pagibig">PAG-IBIG ID</label>
              <input className='input-box' type="text" name="pagibig" value={pagibig} onChange={(e) => setPagibig(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="psn">PSN ID</label>
              <input className='input-box' type="text" name="psn" value={psn} onChange={(e) => setPSN(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="philhealth">PhilHealth ID</label>
              <input className='input-box' required  type="text" name="philhealth" value={philhealth} onChange={(e) => setPhilHealth(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="license">Driver's License ID</label>
              <input className='input-box' type="text" name="license" value={dl} onChange={(e) => setDL(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="others">Others</label>
              <input className='input-box'type="text" name="others" value={others} onChange={(e) => setOthers(e.target.value)} />
            </div>
          </div>
          <p>FAMILY BACKGROUND</p>
          <div className="long-label">
            <label htmlFor="father">FATHER'S NAME</label>
            <input className='input-box' type="text" name="father" value={father} onChange={(e) => setFather(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="mother">MOTHER'S NAME</label>
            <input className='input-box' type="text" name="mother" value={mother} onChange={(e) => setMother(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="guardian">GUARDIAN</label>
            <input className='input-box' type="text" name="guardian" value={guardian} onChange={(e) => setGuardian(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="emergency number">EMERGENCY CONTACT PERSON</label>
            <input className='input-box' type="text" name="emergency number" value={emergencyContactPerson} onChange={(e) => setEmergencyContactPerson(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="emergency number">EMERGENCY CONTACT NUMBER</label>
            <input className='input-box' type="text" name="emergency number" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
          </div>
          <p>OTHER RELEVANT INFORMATION</p>
          <div className="long-label">
            <label htmlFor="physician">CERTIFYING PHYSICIAN</label>
            <input className='input-box' type="text" name="physician" value={physician} onChange={(e) => setPhysician(e.target.value)} />
          </div>
          <div className="long-label">
              <label htmlFor="LicenseNumber">LICENSE NUMBER</label>
              <input className='input-box' type="text" name="LicenseNumber" value={license} onChange={(e) => setLicense(e.target.value)} />
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="ProcessingOfficer">PROCESSING OFFICER</label>
              <input className='input-box'  type="text" name="ProcessingOfficer" value={processingOfficer} onChange={(e) => setProcessingOfficer(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="approvingOfficer">APPROVING OFFICER</label>
              <input className='input-box'  type="text" name="approvingOfficer" value={approvingOfficer} onChange={(e) => setApprovingOfficer(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="encoder">ENCODER</label>
              <input className='input-box' type="text" name="encoder" value={encoder} onChange={(e) => setEncoder(e.target.value)} />
            </div>
          </div>
          
          {/* <label htmlFor="encoder">UPLOAD FILES <span className="required">*</span><h6>CERTIFICATE OF INDIGENCY, BIRTH CERTIFICATE, MEDICAL CERTIFICATE OR CERTIFICATE OF PHYSICIAN</h6></label> */}
          <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
              {/* <img src={addPortrait} alt="Add User Portrait" width={50} height ={50} draggable = {false} /> */}
              {/* <span>Add User Portrait <span className="required">*</span></span> */}
            </label>
            <input className='input-box' required style={{ display: "none" }} type="file" id="img" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          <div className="addPortrait">
            <label htmlFor="file">
              {/* <img src={DocUpload} alt="Add User Portrait" width={50} height ={50} draggable = {false} /> */}
              {/* <span>Upload files <span className="required">*</span></span> */}
            </label>
            <input className='input-box' required style={{ display: "none" }}  type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf, .xlsx, .csv, .txt, .doc, .xls, .png, .jpeg, .jpg, .docx, .odt"/>
          </div>
          </div>
          <button className='input-box' disabled={loading} onClick = {handleSubmit}>ADD USER</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInfoForm;
