import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { capitalize, setCookie, getCookie, deleteCookie } from "../Utilities/Utilities";
import { getUserInfo } from '../Utilities/APIs';

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
  infoGroup: {
    width: "100%",
    height: "35%",
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
  },
  info: {
    fontSize: "25px"
  }
}

function Info(props) {
  const target = props.info.find(item => item.id === props.hover);
  if (target && props.hover) {
    return (
      <div style={ss.infoGroup}>
        <div className="row" style={ss.info}>
          <div className="col"><b>User ID:</b> {target.id}</div>
          <div className="col"><b>Name:</b> {target.firstName} {target.lastName}</div>
        </div>
        <div className="row" style={ss.info}>
          <div className="col"><b>Authority Level:</b> {target.authority}</div>
          <div className="col"><b>Email:</b> {target.email}</div>
          <div className="col"><b>Location:</b> {target.location}</div>
        </div>
        <div className="row" style={ss.info}>
          <div className="col"><b>Owned Buy Posts:</b> {target.ownedBuyPosts.join(", ")}</div>
          <div className="col"><b>Owned Sell Posts:</b> {target.ownedSellPosts.join(", ")}</div>
        </div>
        <div className="row" style={ss.info}>
          <div className="col"><b>Starred Buy Posts:</b> {target.starredBuyPosts.join(", ")}</div>
          <div className="col"><b>Starred Sell Posts:</b> {target.starredSellPosts.join(", ")}</div>
        </div>
      </div>     
    );
  } else {
    return (
      <div style={ss.infoGroup}>
        <h1 style={{fontSize: "100px"}}>Mock Users</h1>
        <h3>You are <b>{props.user ? capitalize(props.user): "No One" }</b> now !</h3>
      </div>
    );
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

  function logOut() {
    deleteCookie("token");
    enqueueSnackbar("You are now successfully logged out.",{variant:'success'});
    navigate("/");
  }

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [user, setUser] = useState();
  const [hover, setHover] = useState("");
  const [info, setInfo] = useState([]);
  const accounts = ["admin", "guest0", "guest1"];
  
  useEffect(() => {
    if (!getCookie('token')) {
      enqueueSnackbar("Pick a user.",{variant:'info'});
    }
    accounts.map(a => {
      getUserInfo(a).then(res => {
        setInfo(info => [...info, res]);
      }).catch(err => {
        enqueueSnackbar(err ,{variant:'error'});
      })
    })
    enqueueSnackbar("Accounts have been setup." ,{variant:'info'});
  }, [])

  useEffect(() => {
    setUser(getCookie('token'));
  }, [switchUser]);
  
  return (
    <>
      <div style={ss.main}>
        <Info info={info} user={user} hover={hover} />
        <div style={ss.buttonGroup}>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-success shadow" value="admin" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
              Admin
            </button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-primary shadow" value="guest0" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
              Guest 0
            </button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-primary shadow" value="guest1" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
              Guest 1
            </button>
          </div>
          <div style={ss.buttonBox}>
            <button className="btn btn-outline-danger shadow" style={ss.button} onClick={logOut}>Log out</button>
          </div>
        </div>
        <h1 style={{fontSize: "50px"}}>Personal Account is coming...</h1>
      </div>
    </>
  );
};

export default Account;

