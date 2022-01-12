import React, { Fragment, useState, useEffect, useLayoutEffect} from 'react';
import Favicon from '../favicon_io/logo.png';
import { MdOutlinePostAdd } from 'react-icons/md';


function useWindowSize() {
  
  const [size, setSize] = useState([0, 0]);
  
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

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
      setMarqueeText("You are browsing #PinkyBOOT# !!!")
    }
  }

  function handleWindowSize() {
    let e = document.querySelector('#rightNav');
    let img = document.querySelector('#navFavicon');
    if (width < 1280) {
      e.style.display = "none";
      img.style.display = "none";
    } else {
      e.style.display = "inline-block";
      img.style.display = "inline-block";
    }
    console.log(e);
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
    right: {
      width: "50%",
      height: "100%",
      display: "inline-block",
      paddingTop: "15px",
    },
    left: {
      width: "50%",
      height: "100%",
      display: "inline-block",
      paddingTop: "15px"      
    },
    ul: {
      listStyleType: "none",
      width: "100%",
      height: "100%",
      paddingLeft: "15px",
    },
    li: {
      marginRight: "15px",
      marginLeft: "3px",
      display: "inline",
    },
    logo: {
      marginRight: "5px",
      height: "50%",
      borderRadius: "5px",
    },
    icon: {
      position:"absolute",
      top: "23px"
    },
    marquee: {
      width:"90%",
      marginRight: "10%",
      color: "red",
      dataDuplicate: "true"
    },
    marqueeHalf: {
      width:"50%",
      marginRight: "10%",
      color: "red",
    },
    form: {
      width: "50%",
    },
    input: {
      width: "25%",
      height: "30px",
      border: "2px solid black",
      borderRadius: "5px",
    },
    button: {
      width: "7%",
      marginLeft: "5px",
      display: "inline-flex",
      alignItems: "center" 
    }
  }

  return (
    <Fragment>
      <div className="nav fixed-top highlight bg-dark">
        <div id="leftNav" style={ss.left}>
          <ul style={ss.ul}>
            <li style={ss.li}>
              <a className="text-warning" href="/"><img src={Favicon} alt="Favicon" style={ss.logo} id="navFavicon"></img>PinkyBOOT</a>
            </li>
            <li style={ss.li}>
              <a className="text-secondary" href="/account">Account</a>
            </li>
            <li style={ss.li}>
              <a className="text-secondary" href="/buy">BUY</a>
            </li>
            <li style={ss.li}>
              <a className="text-secondary" href="/sell">SELL</a>
            </li>
            <li style={ss.li}>
              <a className="text-secondary" href="/add-post">POST<MdOutlinePostAdd style={ss.icon}/></a>
            </li>
          </ul>
        </div>
        <div id="rightNav" style={ss.right}>
          {(status === "buy" || status === "sell") ?
            <div>
              <marquee style={ss.marqueeHalf}>{marqueeText}</marquee>
              <input type="search" placeholder="Find Boots..." aria-label="Search" style={ss.input}></input>
              <button className="btn btn-outline-warning" type="submit" style={ss.button}>GO</button>
            </div>
            :
            <marquee style={ss.marquee}>{marqueeText}</marquee>
            }
        </div>
      </div>
    </Fragment>
  );
}

export default NavBar;