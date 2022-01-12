import React, { useEffect } from "react";
import Favicon from "../favicon_io/favicon.png";
import { useWindowSize } from '../Utilities.js/Utilities';

const Footer = () => {

  function handleWindowSize() {
    let i = document.querySelector('#rightFooter');
    let c = document.querySelector('#leftFooter');
    if (width < 1080) {
      i.style.width = "100%";
      c.style.display = "none";
    } else {
      i.style.width = "20%";
      c.style.display = "flex";
    }
  }
  
  const [width, height] = useWindowSize();

  useEffect(() => {
    handleWindowSize();
  }, [width]);

  const ss = {
    contact: {
      display: "flex",
      flexDirection: "column",
      width: "20%",
      height: "100%",
      alignItems: "start",
      justifyContent: "center",
    },
    info: {
      display: "flex",
      flexDirection: "column",
      width: "20%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    favicon: {
      width: "35px",
    },
    copyright: {
      margin: "0 auto",
      position: "relative",
      textAlign: "center"
    }
  }

  return (
    <>
      <footer id="footer" className="fixed-bottom bg-dark" style={ss.footer}>
        <div id="leftFooter" style={ss.contact}>
          <a className="" href="https://github.com/is0xjh25" target="_blank">GitHub: is0xjh25</a>
          <a href="mailto: is0.jimhsiao@gmail.com">Email: is0.jimhsiao@gmail.com</a>
					<a href="https://linkedin.com/in/yunchi-hsiao/" target="_blank">Linkedin: Yun-Chi Hsiao</a>
        </div>
        <div id="rightFooter" style={ss.info}>
          <img src={Favicon} alt="Favicon"style={ss.favicon}></img>
          <a href="https://is0xjh25.github.io" target="_blank" style={ss.copyright}>Copyright © 2022 PinkCoders, is0xjh25</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;