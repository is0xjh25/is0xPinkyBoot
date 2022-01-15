import React, {} from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { capitalize } from "../Utilities.js/Utilities";

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
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
    height: "100%",
  },
  mid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
    height: "100%",
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
    height: "100%",
  },
  button: {
    width: "75%",
    height: "80%",
    border: "5px solid",
    borderRadius: "5%",
    fontSize: "40px",
  }
}

const Account = (props) => {

  function switchUser(e) {
    props.setUser(e.target.value);
    enqueueSnackbar(`You are now ${capitalize(e.target.value)} !`,{variant:'success'});
    navigate("/");
  }

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();

  return (
    <>
      <div style={ss.main}>
        <h1 style={{fontSize: "100px"}}>Mock Users</h1>
        <h3>You are {capitalize(props.user)} now !</h3>
        <div style={ss.buttonGroup}>
          <div style={ss.left}>
            <button className="btn btn-outline-primary shadow" value="admin" style={ss.button} onClick={switchUser}>Admin</button>
          </div>
          <div style={ss.mid}>
            <button className="btn btn-outline-primary shadow" value="guest0" style={ss.button} onClick={switchUser}>Guest 0</button>
          </div>
          <div style={ss.right}>
            <button className="btn btn-outline-primary shadow" value="guest1" style={ss.button} onClick={switchUser}>Guest 1</button>
          </div>
        </div>
        <h1 style={{fontSize: "50px"}}>Personal Account is coming...</h1>
      </div>
    </>
  );
};

export default Account;

