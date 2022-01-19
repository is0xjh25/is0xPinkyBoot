import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useWindowSize ,capitalize, setCookie, deleteCookie } from "../Utilities/Utilities";
import { getUserInfo } from '../Utilities/APIs';

const ss = {
  main: {
    position: "relative",
    textAlign: "center",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingTop: "3%",
    color: "var(--bs-light)",
    overflow: "hidden",
  },
  infoGroup: {
    width: "100%",
    height: "35%",
  },
  buttonGroup: {
    display: "flex",
    position: "relative",
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
    fontSize: "40px",
    minWidth: "100px",
    textAlign: "center",
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
      <div className="boost" style={ss.infoGroup}>
        <h1 id="mock-user" style={{fontSize: "100px"}}>Mock Users</h1>
        <h3 >You are <b>{props.user ? capitalize(props.user): "No One" }</b> now !</h3>
      </div>
    );
  }
}

const Account = (props) => {

  function handleWindowSize() {
    const b = document.querySelectorAll('.account-button');
    const bArray = [...b];
    const m = document.querySelector('#mock-user');

    if (width < 540) {
      bArray.forEach(b => {
        b.style.fontSize = "25px";
      })
      m.style.fontSize = "50px";
    } else {
      bArray.forEach(b => {
        b.style.fontSize = "40px";
      })
      m.style.fontSize = "100px";
    }
  }

  function switchUser(e) {
    let user = e.target.value;
    setCookie('token', user, 7);
    props.setUser(user);
    enqueueSnackbar(`Switch to ${capitalize(user)}.`,{variant:'success'});
    navigate("/");
  }

  function logOut() {
    deleteCookie("token");
    props.setUser("");
    enqueueSnackbar("You are now successfully logged out.",{variant:'success'});
    navigate("/");
  }

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [width, height] = useWindowSize();
  const [hover, setHover] = useState("");
  const [info, setInfo] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const accounts = ["admin", "guest0", "guest1"];
  
  useEffect(() => {
    // check login
    accounts.map(a => {
      getUserInfo(a).then(res => {
        setInfo(info => [...info, res]);
      }).catch(err => {
        enqueueSnackbar(err ,{variant:'error'});
      })
    })
    if (firstRender) {
      enqueueSnackbar("Accounts have been setup." ,{variant:'info'});
    }
    setFirstRender(false);
  }, [props.user])

  useEffect(() => {
    handleWindowSize()
  }, [width]);

  return (
    <div className="bg-dark" style={ss.main}>
      <Info info={info} user={props.user} hover={hover} />
      <div className="boost" style={ss.buttonGroup}>
        <div style={ss.buttonBox}>
          <button className="btn btn-outline-success shadow account-button" value="admin" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
            Admin
          </button>
        </div>
        <div style={ss.buttonBox}>
          <button className="btn btn-outline-primary shadow account-button" value="guest0" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
            Guest 0
          </button>
        </div>
        <div style={ss.buttonBox}>
          <button className="btn btn-outline-primary shadow account-button" value="guest1" style={ss.button} onClick={switchUser} onMouseEnter={(e) => setHover(e.target.value)} onMouseLeave={() => setHover(null)}>
            Guest 1
          </button>
        </div>
        <div style={ss.buttonBox}>
          <button className="btn btn-outline-danger shadow account-button" style={ss.button} onClick={logOut}>Log out</button>
        </div>
      </div>
      <h1 style={{fontSize: "50px"}}>Personal Account is coming...</h1>
    </div>
  );
};

export default Account;

