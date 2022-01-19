import React, { useState, useEffect } from 'react';
import Favicon from '../favicon_io/logo.png';
import { MdOutlinePostAdd } from 'react-icons/md';
import { useWindowSize, capitalize } from '../Utilities/Utilities';

// Style Sheet
const ss = {
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    fontSize: "25px"
  },
  left: {
    display: "inline-flex",
    position: "relative",
    justifyContent: "start",
    alignItems: "center",
    paddingLeft: "30px",
    width: "40%",
    height: "100%",
  },
  mid: {
    display: "block",
    width: "40%",
    height: "100%",
    paddingRight: "5%",
  },
  fullMid: {
    width: "50%",
    height: "100%",
  },
  right: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "100%",
  },
  fullRight: {
    display: "none"
  },
  favicon: {
    position: "relative",
    height: "32px",
    right:"5px",
    borderRadius: "5px",
  },
  icon: {
    display:"inline",
    position:"relative",
    left: "50px"
  },
  marquee: {
    color: "var(--bs-danger)",
  },
  input: {
    display:"flex",
    width: "70%",
    height: "32px",
    border: "2px solid black",
    borderRadius: "5px",
  },
  button: {
    display:"flex",
    height: "50%",
  },
  buttonText: {
    position:"relative",
    top: "-10px",
  },
  navButton: {
    display: "flex",
    marginRight: "12px",
    alignItems: "center"
  },
}

const NavBar = (props) => {
  // showing marquee
  function getStatus() {
    let str = window.location.pathname.replace('/', '');
    setStatus(str);
    if (str === "buy" || str === "sell") {
      setMarqueeText(`#${str.toUpperCase()}ING# Let's find a good deal !`)
    } else if (str === "add-post") {
      setMarqueeText("#POSTING# Get the best price !")
    } else if (str === "account") {
      setMarqueeText("#ACCOUNT INFORMATION# Suit yourself.")
    } else {
      setMarqueeText("You are visiting #PinkyBOOT# !!!")
    }
  }

  function handleWindowSize() {
    let r = document.querySelector('#rightNav');
    let m = document.querySelector('.midNav');
    let img = document.querySelector('#navFavicon');
    if (width < 1080) {
      r.style.display = "none";
      m.style.display = "none";
      img.style.display = "none";
    } else {
      r.style.display = "flex";
      m.style.display = "block";
      img.style.display = "block";
    }
  }

  const [width, height] = useWindowSize();
  const [status, setStatus] = useState("");
  const [marqueeText, setMarqueeText] = useState("");

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    handleWindowSize()
  }, [width]);

  return (
    <div className="boost" style={ss.main}>
      <div id="leftNav" style={ss.left}>
        <img id="navFavicon" src={Favicon} alt="Favicon" style={ss.favicon}></img>
        <a className="text-warning" href="/" style={ss.navButton}>PinkyBOOT</a>
        <a href="/account" style={ss.navButton}>{props.user !=="" ? capitalize(props.user) : "Account"}</a>
        <a href="/buy" style={ss.navButton}>BUY</a>
        <a href="/sell" style={ss.navButton}>SELL</a>
        <a href="/add-post" style={ss.navButton}>POST<MdOutlinePostAdd style={{flex: "1"}}/></a>
      </div>      
      {(status === "buy" || status === "sell") ?
        <div className="midNav" style={ss.mid}>
          
          <div className="marquee" style={ss.marquee}><p>{marqueeText}</p></div>  
        </div>
      :
        <div className="midNav" style={ss.fullMid}>
          <div className="marquee" style={ss.marquee}><p>{marqueeText}</p></div>  
        </div>
      }      
      {(status === "buy" || status === "sell") ?
        <div id="rightNav" style={ss.right}>
          <input type="search" placeholder="Find Boots..." aria-label="Search" style={ss.input}></input>
          <button className="btn btn-outline-warning shadow-none" type="submit" style={ss.button}><div style={ss.buttonText}>GO</div></button>
        </div>
      :
        <div id="rightNav" style={ss.fullRight}></div>
      }
    </div>
  );
}

export default NavBar;
