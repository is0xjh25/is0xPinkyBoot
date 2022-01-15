import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { capitalize, setCookie, getCookie, deleteCookie } from "../Utilities.js/Utilities";

const ss = {
  main: {
    position: "relative",
    textAlign: "center",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingTop: "5%",
    color: "var(--bs-light)",
    backgroundColor: "var(--bs-dark)"
  },
  buttonGroup: {
    display: "flex",
    position: "relative",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "50%",
  },
  buttonBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    height: "100%",
  },
  button: {
    width: "75%",
    height: "80%",
    border: "5px solid",
    borderRadius: "5%",
    fontSize: "35px",
  }
}

const Account = () => {

  function switchUser(e) {
    let user = e.target.value;
    setCookie('token', user, 7)
    setUser(user);
    enqueueSnackbar(`Switch to ${capitalize(user)}.`,{variant:'success'});
    navigate("/");
  }

  function logOff() {
    deleteCookie("token");
    navigate("/");
  }

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!getCookie('token')) {
      enqueueSnackbar("Pick a user.",{variant:'info'});
    }
  }, [])

  useEffect(() => {
    setUser(getCookie('token'));
  }, [switchUser]);
  
  return (
    <>
      <div style={ss.main}>
        <h1 style={{fontSize: "100px"}}>Mock Users</h1>
        <h3>You are <span className="text-warning">{user ? capitalize(user): "No One" }</span>  now !</h3>
        <div style={ss.buttonGroup}>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-success shadow" value="admin" style={ss.button} onClick={switchUser}>Admin</button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-primary shadow" value="guest0" style={ss.button} onClick={switchUser}>Guest 0</button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-primary shadow" value="guest1" style={ss.button} onClick={switchUser}>Guest 1</button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-danger shadow" value="guest1" style={ss.button} onClick={logOff}>Log Off</button>
          </div>
        </div>
        <h1 style={{fontSize: "50px"}}>Personal Account is coming...</h1>
      </div>
    </>
  );
};

export default Account;

