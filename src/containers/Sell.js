import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkAuthorized } from '../Utilities.js/Utilities';
import { getSellPosts } from '../Utilities.js/API';
import Post from '../components/Post';

const Sell = () => {

  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!checkAuthorized()) {
      navigate("/account");
      enqueueSnackbar("Please login first.",{variant:'warning'});
    } 
    getSellPosts().then(res => {
      setPosts(res);
    }).catch(err => {
      enqueueSnackbar(`${err}`,{variant:'error'});
    })
  }, []);

  return (
    <>
      <h3>Sell</h3>
    </>
  );
};

export default Sell;