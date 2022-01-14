import React, { useState, useEffect } from 'react';
import Favicon from '../favicon_io/logo.png';
import { MdOutlinePostAdd } from 'react-icons/md';
import { useWindowSize } from '../Utilities.js/Utilities';

const NavBar = () => {

  function GetStatus() {
    let str = window.location.pathname.replace('/', '');
    setStatus(str);
    if (str === "buy" || str === "sell") {
      setMarqueeText(`#${str.toUpperCase()}ING# Let's find a good deal !`)
    } else if (str === "add-post") {
      setMarqueeText("#POSTING# Get the best price !")
    } else if (str === "account") {
      setMarqueeText("#ACCOUNT INFO# Suit yourself.")
    } else {
      setMarqueeText("You are visiting #PinkyBOOT# !!!")
    }
  }

  function handleWindowSize() {
    let r = document.querySelector('#rightNav');
    let m = document.querySelector('.midNav');
    let img = document.querySelector('#navFavicon');
    let icon = document.querySelector('#navIcon');
    if (width < 1080) {
      r.style.display = "none";
      m.style.display = "none";
      img.style.display = "none";
      icon.style.display = "none";
    } else {
      r.style.display = "inline-block";
      m.style.display = "inline-block";
      img.style.display = "inline-block";
      icon.style.display = "inline-block";
    }
  }

  const [width, height] = useWindowSize();
  const [status, setStatus] = useState("");
  const [marqueeText, setMarqueeText] = useState("");

  useEffect(() => {
    GetStatus();
  }, []);

  useEffect(() => {
    handleWindowSize()
  }, [width]);

  // Style Sheet
  const ss = {
    left: {
      width: "45%",
      height: "100%",
    },
    mid: {
      width: "35%",
      height: "100%",
    },
    fullMid: {
      width: "50%",
      height: "100%",
    },
    right: {
      width: "20%",
      height: "100%",
    },
    fullRight: {
      display: "none"
    },
    ul: {
      display: "inline",
      width: "100%",
      height: "100%",
      listStyleType: "none",
    },
    li: {
      display: "inline",
      marginRight: "15px",
    },
    favicon: {
      position: "relative",
      height: "50%",
      right:"5px",
      borderRadius: "5px",
    },
    icon: {
      position:"absolute",
      top: "23px"
    },
    marquee: {
      color: "var(--bs-danger)",
    },
    marqueeHalf: {
      color: "var(--bs-danger)",
    },
    form: {
      width: "50%",
      textAlign: "center !important"
    },
    input: {
      width: "70%",
      height: "30px",
      border: "2px solid black",
      borderRadius: "5px",
    },
    button: {
      position: "relative",
      display: "inline-flex",
      width: "40px",
      height: "40px",
      top:"-5px",
      justifyContent: "center",
      textAlign: "center",
    }
  }

  return (
    <>
      <div id= "nav" className="fixed-top highlight bg-dark">
        <div id="leftNav" style={ss.left}>
          <ul style={ss.ul}>
            <li style={ss.li}>
              <a className="text-warning" href="/"><img  id="navFavicon" src={Favicon} alt="Favicon" style={ss.favicon}></img>PinkyBOOT</a>
            </li>
            <li style={ss.li}>
              <a href="/account">Account</a>
            </li>
            <li style={ss.li}>
              <a href="/buy">BUY</a>
            </li>
            <li style={ss.li}>
              <a href="/sell">SELL</a>
            </li>
            <li style={ss.li}>
              <a href="/add-post">POST<MdOutlinePostAdd id="navIcon" style={ss.icon}/></a>
            </li>
          </ul>
        </div>
        {(status === "buy" || status === "sell") ?
        <>
          <div className="midNav" style={ss.mid}>
            <div className="marquee" style={ss.marquee}><h2>{marqueeText}</h2></div>  
          </div>
          <div id="rightNav" style={ss.right}>
            <input type="search" placeholder="Find Boots..." aria-label="Search" style={ss.input}></input>
            <button className="btn btn-outline-warning shadow-none" type="submit" style={ss.button}>GO</button>
          </div>
        </>
        :
        <>
          <div className="midNav" style={ss.fullMid}>
            <div className="marquee" style={ss.marquee}><h2>{marqueeText}</h2></div>  
          </div>
          <div id="rightNav" style={ss.fullRight}></div>
        </>
        }
      </div>
    </>
  );
}

export default NavBar;

