import React, { useEffect } from "react";
import Favicon from "../favicon_io/favicon.png";
import { useWindowSize } from '../Utilities/Utilities';

const ss = {
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    fontSize: "smaller",
    paddingTop: "5px"
  },
  contact: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    lineHeight: "20px",
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  favicon: {
    width: "30px",
  },
  copyright: {
    margin: "0 auto",
    position: "relative",
    textAlign: "center"
  }
}

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

  return (
    <div style={ss.main}>
      <div id="leftFooter" style={ss.contact}>
        <a className="" href="https://github.com/is0xjh25" target="_blank">GitHub: is0xjh25</a>
        <a href="mailto: is0.jimhsiao@gmail.com">Email: is0.jimhsiao@gmail.com</a>
        <a href="https://linkedin.com/in/yunchi-hsiao/" target="_blank">Linkedin: Yun-Chi Hsiao</a>
      </div>
      <div id="rightFooter" style={ss.info}>
        <img src={Favicon} alt="Favicon"style={ss.favicon}></img>
        <a href="https://is0xjh25.github.io" target="_blank" style={ss.copyright}>Copyright © 2022 PinkCoders, is0xjh25</a>
      </div>
    </div>
  );
};

export default Footer;