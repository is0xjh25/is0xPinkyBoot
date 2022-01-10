import React, { Fragment, useState, useEffect } from 'react';
import Favicon from '../favicon_io/logo.png';
import { MdOutlinePostAdd } from 'react-icons/md';

const NavBar = () => {

  const [status, setStatus] = useState("");
  const [marqueeText, setMarqueeText] = useState("");

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

  useEffect(() => {
    GetStatus();
  }, []);

  // Style Sheet
  const ss = {
		brand: {
      marginLeft: "1em",
      color: "red"
    },
    brandImg: {
      height: "1.5em",
      marginRight: "0.5em",
      borderRadius: "5px",
    },
    marquee: {
      paddingTop:"10px",
      color: "red",
      marginLeft: "1em",
    },
    form: {
      paddingTop:"5px",
      marginLeft:"1em"
    },
    input: {
      marginRight: "0.5em",
      border: "7px solid dark",
      borderRadius: "7px",
      justifyContent: "center"
    },
    status: {
      color: "#F08",
    }
  }

  return (
    <Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark justify-content-between highlight">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" style={ss.brand}>
              <a className="nav-link text-warning" href="/"><img src={Favicon} alt="Favicon" style={ss.brandImg}></img>PinkyBOOT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="account">Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buy">BUY</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="sell">SELL</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-post">POST<MdOutlinePostAdd/></a>
            </li>
            <div className="news">
              <marquee className="news-content" style={ss.marquee}>{marqueeText}</marquee>
            </div>
            {(status === "buy" || status === "sell") ?
            <li>
            <form className="form-inline" style={ss.form}>
              <input className="form" type="search" placeholder="Find Boots..." aria-label="Search" style={ss.input}></input>
              <button className="btn btn-outline-warning" type="submit">Check it out</button>
            </form>
            </li>
            :
            null
            }
          </ul>     
        </div>
        <div>
          {status}
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;