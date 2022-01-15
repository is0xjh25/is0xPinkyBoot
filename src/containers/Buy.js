import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkAuthorized } from '../Utilities.js/Utilities';
import { getBuyPosts } from '../Utilities.js/API';
import Post from '../components/Post';

const Buy = () => {

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (!checkAuthorized()) navigate("/account");
    getBuyPosts().then(res => {
      setPosts(res);
    }).catch(err => {
      enqueueSnackbar(`${err}`,{variant:'error'});
    })
  }, []);

  return (
    <>
      <table className="tableFixHead">
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">Location</th>
            <th scope="col">Contact</th>
          </tr>
        </thead>
        {posts.map(p => 
          { return (
            <tbody>
              <Post brand={p.brand} model={p.model} status={p.status} price={p.price}/>
            </tbody>
            )
          }
        )}
      </table>
    </>
  );
};

export default Buy;