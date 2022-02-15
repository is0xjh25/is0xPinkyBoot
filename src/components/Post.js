import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { capitalize } from '../Utilities/Utilities';
import { getUserInfo, checkPost } from '../Utilities/APIs';
import { BsBack, BsTrash, BsUpload } from 'react-icons/bs';
import { BiEdit} from 'react-icons/bi';
import { FaHeartBroken, FaHeart} from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const ss = {
  infoGroup: {
    position: "relative",
    textAlign: "center",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    color: "var(--bs-light)",
  },
  buttonGroup: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
  },
  buttonBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
    height: "100%",
  },
  button: {
    border: "2px solid ",
    borderRadius: "10%",
    fontSize: "20px",
  },
  info: {
		paddingTop: "2%",
    fontSize: "30px"
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
	clickBox: {
    width: "25px",
    height: "25px",
    marginLeft: "25px",
    marginRight: "5px",
  },
	heading: {
		marginTop: "20px",
	},
	input: {
		width: "150px",
		textAlign: "center",
  },
}

function Display(props) {
	
	const {post, poster, user, authority, close, setPage, handleStarPost, handleUnStarPost} = props;
	const [postStarred, setPostStarred] = useState();

	useEffect(() => {
		checkPost(user, post, "starred").then(res => setPostStarred(res));
	}, [])

	return(
		<>
			<div style={ss.infoGroup}>
			{
				post.trade === "buy" ?
				<h2 className="text-primary" style={ss.heading}>{`Post ${post.id} is looking for...`}</h2>
				:
				<h2 className="text-primary" style={ss.heading}>{`Post ${post.id} is finding a new owener...`}</h2>
			}
				<div className="row" style={ss.info}>
					<div className="col"><b>BRAND:</b> {capitalize(post.brand)}</div>
					<div className="col"><b>MODEL:</b> {post.model.toUpperCase()}</div>
					<div className="col"><b>SIZE (cm):</b>{capitalize(post.gender)+" "+post.size}</div>
					<div className="col"><b>PRICE:</b> 
						{post.price}
						{
							post.negotiable === "true" ?
							<span style={{fontSize: "smaller"}}> (negoitable)</span>
							:
							null
						}
					</div>
				</div>
				<div className="row" style={ss.info}>
					<div className="col"><b>STATUS:</b>{capitalize(post.status)}</div>
					<div className="col" style={{overflowX:"scroll"}}><b>DESCRIPTION:</b> {post.description}</div>
				</div>
				<h2 className="text-primary" style={{marginTop:"10px"}} style={ss.heading}>~Contact~</h2>
				<div className="row" style={ss.info}>
					<div className="col"><b>USER:</b> {poster.id}</div>
					<div className="col"><b>EMAIL:</b> <a id="display-post-email" href={`mailto:${poster.email}`}>{poster.email}</a></div>
					<div className="col"><b>LOCATION:</b> {poster.location}</div>
				</div>
			</div>
			<div style={ss.buttonGroup}>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-light shadow" name="back" onClick={()=>{close();}} style={ss.button}><BsBack/></button>
				</div>
				{
					authority === 0 ?
					<div style={ss.buttonBox}>
						<button className="btn btn-outline-primary shadow" onClick={()=>setPage("edit")} style={ss.button}><BiEdit/></button>
					</div>
					:
					<div style={ss.buttonBox}></div>
				}
				{
					postStarred ?
					<div style={ss.buttonBox}>
						<button className="btn btn-outline-warning shadow" onClick={()=>handleUnStarPost(user, post)}style={ss.button}><FaHeartBroken/></button>
					</div>
					:
					<div style={ss.buttonBox}>
						<button className="btn btn-outline-warning shadow" onClick={()=>handleStarPost(user, post)}style={ss.button}><FaHeart/></button>
					</div>
				}
			</div>
		</>
	)
}

function Edit(props) {
	
  const {enqueueSnackbar}  = useSnackbar();
	const {post, setPage, handleDeletePost, handleUpdatePost} = props;
	const [stat, setStat] = useState({});

	function isEdited() {
		return !(JSON.stringify(stat) === JSON.stringify(post)); 
	}

	function handleOnChange(e) {
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
		if (isEdited()) {
			handleUpdatePost(stat);
		} else {
			enqueueSnackbar("You have not edited yet.",{variant:'warning'});
		}
  	}

	useEffect(() => {
		setStat(post);
	}, [])

	return(
		<>
			<div style={ss.infoGroup}>
				<form id="update-post-form" name="update-post-form" style={ss.form} onChange={handleOnChange} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
                <label htmlFor="edit-post-trade">BUY / SELL</label>
                <div>
                  <select id="edit-post-trade" name="trade" defaultValue={post.trade} required style={ss.input}>
                    <option value={post.trade}>{post.trade}</option>
                  </select>
                </div>
            </div>
						<div className="col">
              <label htmlFor="edit-post-brand">BRAND</label>
              <div>
                <select id="edit-post-brand" name="brand" defaultValue={post.brand} required style={ss.input}>
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
              <label htmlFor="edit-post-status">STATUS</label>
              <div>
                <select id="edit-post-status" name="status" defaultValue={post.status} required style={ss.input}>
                  <option value="" disabled>Choose</option>
                  <option value="brand-new">Brand-new</option>
                  <option value="second-hand">Second-hand</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
						<div className="col">
              <label htmlFor="edit-post-gender">GENDER</label>
              <div>
                <select id="edit-post-gender" name="gender" defaultValue={post.gender} required style={ss.input}>
                  <option value="" disabled>Choose</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            </div>
						<div className="col">
              <label htmlFor="edit-post-size">SIZE (cm)</label>
              <div>
                <input id="edit-post-size" name="size" type="number" max="50" min="10" step=".5" defaultValue={post.size} placeholder={post.size} required style={ss.input}/>
              </div>
            </div>
            <div className="col">
              <label htmlFor="edit-post-model">MODEL</label>
              <div>
                <input id="edit-post-model" name="model" type="text" defaultValue={post.model} placeholder={post.model} required style={ss.input}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="edit-post-price">PRICE</label>
              <div>
                <input id="edit-post-price" name="price" type="number" min="0" defaultValue={post.price} placeholder={post.price} required style={ss.input}/>
                <input id="addPostNegotiable" name="negotiable" type="checkbox" defaultChecked={post.negotiable==="true" ? true : false} style={ss.clickBox}/>
                <span>NEGOTIABLE</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div id="edit-post-hidden" className="col">
              <label htmlFor="edit-post-description">DESCRIPTION</label>
              <div>
                <textarea id="edit-post-description" name="description" type="text" rows="3" cols="40" defaultValue={stat.description} form-group/>
              </div>
            </div>
          </div>
				</form>
			</div>
			<div style={ss.buttonGroup}>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-light shadow" onClick={()=>setPage("display")} style={ss.button}><BsBack/></button>
				</div>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-danger shadow" onClick={()=>handleDeletePost(post)} style={ss.button}><BsTrash/></button>
				</div>
				<div style={ss.buttonBox}>
					<button className="btn btn-outline-warning shadow" form="update-post-form" type="submit" style={ss.button}><BsUpload/></button>
				</div>
			</div>
		</>
	)
}

const Post = (props) => {
	
	const {post, user, page, setPage, handleUpdatePost, handleDeletePost, handleStarPost, handleUnStarPost, refresh, update} = props;
	const [poster, setPoster] = useState({});
	const [authority, setAuthority] = useState(1);
	const [belonging, setBelonging] = useState("");

	useEffect(() => {
		// fetch poster info
		getUserInfo(post.posterId).then(pr => {
			setPoster(pr);
		});
		// set authority
		(user === "admin" || user === post.posterId) ? setAuthority(0) : setAuthority(1);
		// set belonging (row color)
		getUserInfo(user).then(u => {
			if (user === post.posterId) {
				setBelonging("owned");
			} else if(u[`starred${capitalize(post.trade)}Posts`].includes(String(post.id))) {
				setBelonging("starred");
			} else {
				setBelonging("");
			}
		})

		return () => {
			setPoster({});
			setAuthority(1);
			setBelonging("");
		}
	},[refresh]);

	return (
		<>
		  <Popup trigger={			
				<tr className={belonging==="owned" ? "post-row-owned" : belonging==="starred" ? "post-row-starred":"post-row"}>
					<td>{capitalize(post.brand)}</td>
					<td>{post.model.toUpperCase()}</td>
					<td>{post.gender.toUpperCase()+" "+post.size}</td>
					<td>{capitalize(post.status)}</td>
					<td>{post.price}</td>
					<td>{poster.location}</td>
					<td>{poster.id}</td>
					<td>{poster.email}</td>
				</tr>
			} modal>
				{close => (
      	<div className="popup"> 
				{ 
					page === "none" ? 
					<div onClick={close()}></div>
					:
					page === "display" ?
		  		<Display post={post} poster={poster} user={user} authority={authority} close={close} setPage={setPage} handleStarPost={handleStarPost} handleUnStarPost={handleUnStarPost}/> 
					:
					page === "edit" ?
		  		<Edit post={post} close={close} setPage={setPage} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost}/>
					: 
					null 
				}
		 		</div>)}
			</Popup>
		</>
	)
}

export default Post;
