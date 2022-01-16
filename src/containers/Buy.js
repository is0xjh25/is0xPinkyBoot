import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkAuthorized } from '../Utilities.js/Utilities';
import { getBuyPosts } from '../Utilities.js/API';
import Post from '../components/Post';

const Buy = () => {

  const {enqueueSnackbar}  = useSnackbar();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  
  useEffect(() => {
    const checkUser = checkAuthorized();
    if (!checkUser) {
      navigate("/account");
      enqueueSnackbar("Please login first.",{variant:'warning'});
    } else {
      setUser(checkUser);
    }
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
            <th scope="col">Poster</th>
            <th scope="col">Contact</th>
          </tr>
        </thead>
        <tbody>
        {posts.map(p => 
          { return (
              <Post post={p} user={user}/>
            )
          }
        )}
        </tbody>
      </table>
    </>
  );
};

export default Buy;