import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { updatePost, deletePost, savePost, removePost } from '../Utilities/APIs';
import { checkAuthorized } from '../Utilities/Utilities';
import Buy from '../components/Buy';
import Sell from '../components/Sell';

const Trade = (props) => {

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

    setPage("display");

    return () => {
      setUser("");
      setPage("display");
      setRefreshCount(0);
    }
  }, [refreshCount]);

  return (
      <>
		{
		  props.fn === "buy" ?
		  <Buy user={user} refresh={refresh} page={page} setPage={setPage} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} handleStarPost={handleStarPost} handleUnStarPost={handleUnStarPost}/> 
		  :
		  <Sell user={user} refresh={refresh} page={page} setPage={setPage} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} handleStarPost={handleStarPost} handleUnStarPost={handleUnStarPost}/>
  		}
      </>
  );
};

export default Trade;
