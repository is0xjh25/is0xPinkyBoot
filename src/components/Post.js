import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useSnackbar } from 'notistack';
import { capitalize } from '../Utilities.js/Utilities';
import { getUserInfo } from '../Utilities.js/API';

const Post = (props) => {

	const {enqueueSnackbar}  = useSnackbar();
	const {post, user} = props;
	const [poster, setPoster] = useState(
		getUserInfo(post.posterId).then(pr => {
			setPoster(pr);
		}).catch(err => {
			enqueueSnackbar(`${err}`,{variant:'error'});
		})
	);

	return (
		<>
		  <Popup trigger={			
				<tr className='trade-row'>
					<td>{capitalize(post.brand)}</td>
					<td>{post.model.toUpperCase()}</td>
					<td>{capitalize(post.status)}</td>
					<td>{post.price}</td>
					<td>{poster.location}</td>
					<td>{poster.email}</td>
				</tr>
			} modal>
      	<div className="popup"> Modal content </div>
			</Popup>

		</>
	)
}

export default Post;
