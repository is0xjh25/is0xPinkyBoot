import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkAuthorized } from '../Utilities.js/Utilities';
import { getBuyPosts, deletePost } from '../Utilities.js/API';
import Post from '../components/Post';

const Buy = () => {
  
  function handleDeletePost (post) {
    deletePost(post).then(res => {
      if (res.status === 200) {
        enqueueSnackbar(`Post ${post.id} is successfully deleted.`,{variant:'success'});
        setPage("none");
      } else {
        enqueueSnackbar(res.statusText, {variant:'error'});
      }
    })
    refresh();
  }

  const {enqueueSnackbar}  = useSnackbar();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
	const [page, setPage] = useState("display"); 
  const [refreshCount, setRefreshCount] = useState(0);
  const refresh = () => {
    setTimeout(() => {setRefreshCount(refreshCount+1);}, 1000);
  }

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
  }, [refreshCount]);

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
              <Post post={p} user={user} page={page} setPage={setPage} handleDeletePost={handleDeletePost}/>
            )
          }
        )}
        </tbody>
      </table>
    </>
  );
};

export default Buy;