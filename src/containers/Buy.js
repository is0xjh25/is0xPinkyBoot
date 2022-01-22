import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getBuyPosts, updatePost, deletePost, savePost, removePost } from '../Utilities/APIs';
import { checkAuthorized } from '../Utilities/Utilities';
import Post from '../components/Post';

const Buy = () => {

  function handleUpdatePost (post) {
    updatePost(post).then(res => {
      if (res.status === 200) {
        enqueueSnackbar(`Post ${post.id} has been successfully updated.`,{variant:'success'});
        setPage("none");
      } else {
        enqueueSnackbar(res.statusText, {variant:'error'});
      }
    })
    refresh();
  }
  
  function handleDeletePost (post) {
    deletePost(post).then(res => {
      if (res.status === 200) {
        enqueueSnackbar(`Post ${post.id} has been successfully deleted.`,{variant:'success'});
        setPage("none");
      } else {
        enqueueSnackbar(res.statusText, {variant:'error'});
      }
    })
    refresh();
  }

  function handleStarPost (userId, post) {
    savePost(userId, post, "starred").then(res => {
      if (res.status === 200) {
        enqueueSnackbar(`Post ${post.id} has been successfully starred.`,{variant:'success'});
        setPage("none");
      } else {
        enqueueSnackbar(res.statusText, {variant:'error'});
      }
    })
    refresh();
  }

  function handleUnStarPost (userId, post) {
    removePost(userId, post, "starred").then(res => {
      if (res.status === 200) {
        enqueueSnackbar(`Post ${post.id} has been successfully unstarred.`,{variant:'success'});
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
	const [page, setPage] = useState("display"); 
  const [refreshCount, setRefreshCount] = useState(0);
  const [user, setUser] = useState("");

  const refresh = () => {
    setTimeout(() => {setRefreshCount(refreshCount+1);}, 1000);
  }

  useEffect(() => {
    // check login
    const user = checkAuthorized();
    if (!user) {
      navigate("/account");
      enqueueSnackbar("Please login first.",{variant:'warning'});
    } else {
      setUser(user);
    }
    getBuyPosts().then(res => {
      setPosts(res);
    })
    setPage("display");
  }, [refreshCount]);

  return (
      <div className="table-fix-head">
        <table>
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Size (cm)</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Location</th>
              <th scope="col">Buyer</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
          {posts.map(p => 
            { return (
                <Post key={p.id} post={p} user={user} page={page} setPage={setPage} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} handleStarPost={handleStarPost} handleUnStarPost={handleUnStarPost} refresh={refresh}/>
              )
            }
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Buy;