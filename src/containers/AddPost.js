import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { BsTrash, BsUpload } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { useWindowSize } from '../Utilities/Utilities';
import { storePost } from '../Utilities/APIs';

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
    paddingTop: "10px",
  },
  clickBox: {
    width: "25px",
    height: "25px",
    marginLeft: "25px",
    marginRight: "5px",
  },
  buttonGroup: {
    paddingTop: "10px",
  },
  button: {
    border: "2px solid ",
    fontSize: "20px"
  }
}

const AddPost = (props) => {

  function handleWindowSize() {
    let d = document.querySelector('#add-post-hidden');
    if (width < 540 || height < 620) {
      d.style.display = "none";
    } else {
      d.style.display = "inline-block";
    }
  }

  const handleOnChange = (e) => {
    if (e.target.name === "negotiable" && e.target.checked) {
      setStat({
        ...stat,
        [e.target.name]: "true"
      });
    } else if (e.target.name === "negotiable" && !e.target.checked) {
      setStat({
        ...stat,
        [e.target.name]: "false"
      });
    } else {
      setStat({
        ...stat,
        [e.target.name]: e.target.value
      });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    storePost(stat).then(res => {
      if (res.status === 200 || res.status === 201) {
        enqueueSnackbar("It had been posted successfully.",{variant:'success'});
      } else {
        enqueueSnackbar("Post failed. Please try again.", {variant:'error'});
      }
    })
    // clean up
    document.forms["add-post-form"].reset();
  }
  
  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [width, height] = useWindowSize();
  const [stat, setStat] = useState({});
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // check login
    if (!firstRender && !props.user) {
      navigate("/account");
      enqueueSnackbar("Please login first.",{variant:'warning'});
    }

    setStat({
      trade: "",
      status: "",
      brand: "",
      model: "",
      gender: "",
      size: "",
      price: "",
      negotiable: "false",
      description: "",
      posterId: `${props.user}`,
    })

    setFirstRender(false);
  }, [props.user]);

  useEffect(() => {
    handleWindowSize()
  }, [width, height]);

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
              <label htmlFor="add-post-gender">MALE / FEMALE</label>
              <div className="add-post-box">
                <select id="add-post-gender" name="gender" defaultValue="" required style={ss.input}>
                  <option value="" disabled>Choose</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            </div>
            <div className="col">
              <label htmlFor="add-post-size">SIZE</label>
              <div className="add-post-box">
                <input id="add-post-size" name="size" type="number" max="50" min="10" step=".5" placeholder="What size is this? (cm)" required style={ss.input}/>
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
                <input id="add-post-price" name="price" type="number" min="0" placeholder="Expecting this number!" required style={ss.input}/>
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
          <div className="row add-post-box" style={ss.rowGap, ss.buttonGroup}>
            <div className="col">
              <button className="btn btn-outline-light shadow" onClick={()=>{navigate("/")}} style={ss.button}><BsTrash/></button>
            </div>
            <div className="col">
              <button className="btn btn-outline-light shadow" type="reset" style={ss.button}><BiRefresh/></button>
            </div>
            <div className="col form-group">
              <button className="btn btn-outline-warning shadow" form="add-post-form" type="submit" style={ss.button}><BsUpload/></button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPost;