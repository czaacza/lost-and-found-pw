import React, { useState } from 'react';
import './Home.css';
import Post from '../Post/Post';
import PostComposer from '../PostComposer/PostComposer';
import { useGlobalContext } from '../../context/GlobalContext';

function Home() {
  const [postType, setPostType] = useState('LOST'); // 'lost' or 'found'

  // Dummy posts data array. Replace this with actual data.
  const { posts } = useGlobalContext();

  return (
    <div className="container home">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-3 left-column">
          <div className="sort-section">
            <p>Sort with:</p>
            <div className="buttons-row">
              <button className="btn btn-sort">Newest</button>
              <button className="btn btn-sort">Oldest</button>
              <button className="btn btn-sort">Most comments</button>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-md-6 posts-column">
          {/* Switch buttons for Lost and Found */}
          <div className="switch-buttons">
            <button
              className={`btn switch-btn ${
                postType === 'LOST' ? 'active' : ''
              }`}
              onClick={() => setPostType('LOST')}
            >
              Lost
            </button>
            <button
              className={`btn switch-btn ${
                postType === 'FOUND' ? 'active' : ''
              }`}
              onClick={() => setPostType('FOUND')}
            >
              Found
            </button>
          </div>
          <PostComposer postType={postType} />
          {/* Render posts based on the selected post type */}
          {/* IF POSTS EXIST AND IS ARRAY*/}
          {posts &&
            posts
              .filter((post) => post.category === postType)
              .map((post) => <Post key={post._id} post={post} />)}
        </div>

        {/* Right Column */}
        <div className="col-md-3 right-column">
          <h3>Popular locations:</h3>
          <ul className="list-group">
            <li className="list-group-item">Gmach Chemii (54)</li>
            <li className="list-group-item">Gmach Fizyki (37)</li>
            <li className="list-group-item">Gmach MiNI (16)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
