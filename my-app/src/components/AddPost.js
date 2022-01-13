import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash, BsUpload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';

const AddPost = () => {

  const handleOnChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  const [state, setState] = useState({
    trade: "",
    status: "",
    brand: "",
    model: "",
    price: "",
    negotiable: "",
    description: ""
  })

  const ss = {
    main: {
      width: "100%",
      height: "100%",

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
    }
  }

  return (
    <>
      <div className="bg-dark" style={ss.main}>
        <form style={ss.form} onChange={handleOnChange}>
          <div className="row" style={ss.rowGap}>
            <div className="col">
                <label for="add-post-trade">BUY / SELL</label>
                <div className="add-post-box">
                  <select id="add-post-trade" name="trade" defaultValue="" required style={ss.input}>
                    <option value="" disabled>Choose</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
            </div>
            <div className="col">
              <label for="add-post-status">STATUS</label>
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
              <label for="add-post-brand">BRAND</label>
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
              <label for="add-post-model">MODEL</label>
              <div className="add-post-box" >
                <input id="add-post-model" name="model" type="text" placeholder="What is the name of boot?" required style={ss.input}/>
              </div>
            </div>
          </div>
          <div className="row" style={ss.rowGap}>
            <div className="col">
              <label for="add-post-price">PRICE</label>
              <div className="add-post-box">
                <input id="add-post-price" name="price" type="number" min="0" placeholder="Expected this number!" required style={ss.input}/>
                <input id="addPostNegotiable" name="negotiable" type="checkbox"  style={{marginLeft: "25px"}}/>
                <span >NEGOTIABLE</span>
              </div>
            </div>
          </div>
          <div className="row" style={ss.rowGap}>
            <div className="col">
              <label for="add-post-description">DESCRIPTION</label>
              <div className="add-post-box">
                <textarea id="add-post-description" name="description" type="text" rows="3" cols="40"/>
              </div>
            </div>
          </div>
          <div className="row add-post-box" style={ss.rowGap}>
            <div className="col">
              <button className="btn btn-outline-secondary shadow" onClick={()=>{navigate(-1)}}><BsTrash/></button>
            </div>
            <div className="col">
              <button className="btn btn-outline-secondary shadow" type="reset"><BiRefresh/></button>
            </div>
            <div className="col">
              <button className="btn btn-outline-warning shadow"><BsUpload/></button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;