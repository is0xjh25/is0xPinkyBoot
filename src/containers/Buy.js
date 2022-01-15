import React, { useState, useEffect} from 'react';
import { useSnackbar } from 'notistack';
import { getBuyPosts } from '../Utilities.js/API';
import Post from '../components/Post';

const Buy = () => {

  const {enqueueSnackbar}  = useSnackbar();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
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