import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Favicon from '../favicon_io/android-chrome-512x512.png';
import { BsCashCoin } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineLogin } from 'react-icons/ai';
import { useWindowSize } from '../Utilities.js/Utilities';

const ss = {
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
    fontSize: "80px",
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
    alignItems: "end",
    justifyContent: "center",
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
    fontSize: "80px",
  }
}

const Home = () => {

  function handleWindowSize() {
    let i = document.querySelector('#accountFavicon');
    if (width < 1080) {
      i.style.display = "none";
    } else {
      i.style.display = "inline-block";
    }
  }



  const navigate = useNavigate();
  const [width, height] = useWindowSize();

  useEffect(() => {
    handleWindowSize()
  }, [width]);

  return (
    <>
    <div className="bg-dark highlight" style={ss.top}>
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
      <a href="/account"><AiOutlineLogin/> LOGIN</a>
    </div>
    </>
  );
};

export default Home;