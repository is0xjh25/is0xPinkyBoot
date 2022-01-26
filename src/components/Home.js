import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useWindowSize, capitalize, getCookie } from "../Utilities/Utilities";
import Favicon from '../favicon_io/android-chrome-512x512.png';
import { BsCashCoin } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineLogin } from 'react-icons/ai';

const ss = {
  main: {
    width: "100%",
    height: "100%",
    color: "var(--bs-light)",
    overflow: "hidden"
  },
  top: {
    display: "flex",
    width: "100%",
    height: "75%",
  },
  bot: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "25%",
    fontSize: "70px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: "100%",
  },
  mid: {
    display: "flex",
    display: "-webkit-flex",
    justifyContent: "center",
    WebkitJustifyContent: "center",
    alignItems: "center",
    WebkitAlignItems: "flex-center",
    width: "10%",
    height: "100%",
  },
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: "100%",
  },
  favicon: {
    width: "100%",
  },
  button: {
    width: "75%",
    height: "80%",
    border: "5px solid",
    borderRadius: "5%",
    fontSize: "70px",
  },
  info: {
    display: "block",
    position: "relative",
    top: "30px",
    left: "10px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    color: "white"
  }
}

const Home = () => {

  function handleWindowSize() {
    const i = document.querySelector('#accountFavicon');
    const s = document.querySelector('#switch-info');

    if (width < 540) {
      i.style.display = "none";
      s.style.display = "none";
    } else if (width < 1080) {
      i.style.display = "none";
      s.style.display = "inline";
    } else {
      i.style.display = "inline-block";
      s.style.display = "inline";
    }
  }

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [width, height] = useWindowSize();
  const [user, setUser] = useState("");
  
  useEffect(() => {

    const cookie= getCookie('token');

    if (cookie === "") {
      enqueueSnackbar("Please login first.",{variant:'warning'});
      setUser("");
    }  else {
      setUser(cookie);
    }

    return () => {
      setUser("");
    }
  }, [])

  useEffect(() => {
    handleWindowSize()
  }, [width]);

  return (
    <div className="boost" style={ss.main}>
      <div className="bg-dark" style={ss.top}>
        <div style={ss.left}>
          <button className="btn btn-outline-warning shadow" style={ss.button} onClick={()=>{navigate("./buy")}}>
            <AiOutlineShoppingCart/> BUY
          </button>
        </div>
        <div style={ss.mid}>
          <img id="accountFavicon" src={Favicon} alt="Favicon" style={ss.favicon}></img>
        </div>
        <div style={ss.right}>
          <button className="btn btn-outline-warning shadow" style={ss.button} onClick={()=>{navigate("./sell")}}>
            <BsCashCoin/> SELL
          </button>
        </div>
      </div>
      <div className="bg-dark highlight" style={ss.bot}>
        <div>
          <a href="/account"><AiOutlineLogin/> {user ? " SWITCH": " LOGIN"} </a>
        </div>
        <span id="switch-info" style={ss.info}>
          {user ? `Now is ${capitalize(user)}`: null}
        </span>
      </div>
    </div>
  );
};

export default Home;