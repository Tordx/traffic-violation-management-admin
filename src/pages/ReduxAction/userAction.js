const setUser = (userObj) => {
    console.log('====================================userObj');
    console.log(userObj);
    console.log('====================================userObj');
    return {    
        type: "SET_USER",
        payload: userObj
    }
}
const setAnnoucement = (userObj) => {
    console.log('====================================annoucement');
    console.log(userObj);
    console.log('====================================annoucement');
    return {    
        type: "SET_ANNOUCEMENT",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logOut,
    setAnnoucement
}