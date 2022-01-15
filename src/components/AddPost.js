import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { BsTrash, BsUpload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { useWindowSize } from '../Utilities.js/Utilities';
import { storePost } from '../Utilities.js/API';

const AddPost = (props) => {

  function handleWindowSize() {
    let d = document.querySelector('#add-post-hidden');
    if (width < 530 || height < 620) {
      d.style.display = "none";
    } else {
      d.style.display = "inline-block";
    }
  }

  const handleOnChange = (e) => {
    if (e.target.name === "negotiable" && e.target.checked) {
      setState({
        ...state,
        [e.target.name]: "true"
      });
    } else if (e.target.name === "negotiable" && !e.target.checked) {
      setState({
        ...state,
        [e.target.name]: "false"
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    storePost(state.trade, state).then(_ => {
      enqueueSnackbar("Posted Successfully",{variant:'success'});
    }).catch(err => {
      enqueueSnackbar(`${err}`,{variant:'error'});
    });

    // clean up
    document.forms["add-post-form"].reset();
  }
  
  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [width, height] = useWindowSize();
  const [state, setState] = useState({
    trade: "",
    status: "",
    brand: "",
    model: "",
    price: "",
    negotiable: "false",
    description: "",
    poster: `${props.user}`
  })

  useEffect(() => {
    handleWindowSize()
  }, [width, height]);

  const ss = {
    main: {
      width: "100%",
      height: "auto",
      minHeight: "100%",
      backgroundColor: "var(--bs-dark)"
    },
    form: {
      position: "relative",
      width: "80%",
      height: "100%",
      left: "10%",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--bs-warning)",
    },
    input: {
      width: "200px",
      textAlign: "center",
    },
    rowGap: {
      paddingTop: "15px"
    },
    clickBox: {
      width: "25px",
      height: "25px",
      marginLeft: "25px",
      marginRight: "5px",
    }
  }

  return (
    <>
      <div style={ss.main}>
        <form id="add-post-form" name="add-post-form" style={ss.form} onChange={handleOnChange} onSubmit={handleSubmit}>
          <div className="row" style={ss.rowGap}>
            <div className="col">
                <label htmlFor="add-post-trade">BUY / SELL</label>
                <div className="add-post-box">
                  <select id="add-post-trade" name="trade" defaultValue="" required style={ss.input}>
                    <option value="" disabled>Choose</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
            </div>
            <div className="col">
              <label htmlFor="add-post-status">STATUS</label>
              <div className="add-post-box">
                <select id="add-post-status" name="status" defaultValue=""  required style={ss.input}>
                  <option value="" disabled>Choose</option>
                  <option value="brand-new">Brand-new</option>
                  <option value="second-hand">Second-hand</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={ss.rowGap}>
            <div className="col">
              <label htmlFor="add-post-brand">BRAND</label>
              <div className="add-post-box">
                <select id="add-post-brand" name="brand" defaultValue="" required style={ss.input}>
                  <option value="" disabled>Choose</option>
                  <option value="adidas">Adidas</option>
                  <option value="asics">Asics</option>
                  <option value="converse">Converse</option>
                  <option value="jordan">Jordan</option>
                  <option value="nike">Nike</option>
                  <option value="puma">Puma</option>
                </select>
              </div>
            </div>
            <div className="col">
              <label htmlFor="add-post-model">MODEL</label>
              <div className="add-post-box" >
                <input id="add-post-model" name="model" type="text" placeholder="What is the name of boot?" required style={ss.input}/>
              </div>
            </div>
          </div>
          <div className="row" style={ss.rowGap}>
            <div className="col">
              <label htmlFor="add-post-price">PRICE</label>
              <div className="add-post-box">
                <input id="add-post-price" name="price" type="number" min="0" placeholder="Expected this number!" required style={ss.input}/>
                <input id="addPostNegotiable" name="negotiable" type="checkbox" style={ss.clickBox}/>
                <span >NEGOTIABLE</span>
              </div>
            </div>
          </div>
          <div className="row" style={ss.rowGap}>
            <div id="add-post-hidden" className="col">
              <label htmlFor="add-post-description">DESCRIPTION</label>
              <div className="add-post-box">
                <textarea id="add-post-description" name="description" type="text" rows="3" cols="40"/>
              </div>
            </div>
          </div>
          <div className="row add-post-box" style={ss.rowGap}>
            <div className="col">
              <button className="btn btn-outline-light shadow" onClick={()=>{navigate("/")}}><BsTrash/></button>
            </div>
            <div className="col">
              <button className="btn btn-outline-light shadow" type="reset"><BiRefresh/></button>
            </div>
            <div className="col form-group">
              <button className="btn btn-outline-warning shadow" form="add-post-form" type="submit"><BsUpload/></button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;