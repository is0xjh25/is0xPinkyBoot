import React, { useState, useEffect} from 'react';
import { getSellPosts } from '../Utilities/APIs';
import Post from './Post';

const Sell = (props) => {

  const {user, refresh, page, setPage, handleUpdatePost, handleDeletePost, handleStarPost, handleUnStarPost} = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    getSellPosts().then(res => {
      setPosts(res);
    })

    return () => {
      setPosts([]);
    }
  }, []);

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

export default Sell;