import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { capitalize } from '../Utilities.js/Utilities';

const Post = (props) => {

	return (
		<>
		  <Popup trigger={			
				<tr className='trade-row'>
					<td>{capitalize(props.brand)}</td>
					<td>{props.model.toUpperCase()}</td>
					<td>{capitalize(props.status)}</td>
					<td>{props.price}</td>
					<td>Melbourne</td>
					<td>jim@gmail.com</td>
				</tr>
			} modal>
      	<div className="popup"> Modal content </div>
			</Popup>

		</>
	)
}

export default Post;
