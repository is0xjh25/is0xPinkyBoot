import React, { useState, useEffect} from 'react';
import Post from './Post';

const Sell = (props) => {

  const {user, refresh, update, page, setPage, posts, handleUpdatePost, handleDeletePost, handleStarPost, handleUnStarPost} = props;

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
                <Post key={p.id} post={p} user={user} page={page} setPage={setPage} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} handleStarPost={handleStarPost} handleUnStarPost={handleUnStarPost} refresh={refresh} update={update}/>
              )
            }
          )}
          </tbody>
        </table>
      </div>
  );
};

export default Sell;