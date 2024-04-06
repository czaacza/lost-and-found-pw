import React, { useState } from 'react';
import './Home.css';
import Post from '../Post/Post';
import PostComposer from '../PostComposer/PostComposer';
import { useGlobalContext } from '../../context/GlobalContext';
import SwitchButtons from './SwitchButtons/SwitchButtons';
import { useAuth } from '../../context/AuthContext';

function Home() {
  const [postType, setPostType] = useState('LOST'); // 'lost' or 'found'
  const { user } = useAuth();

  // Dummy posts data array. Replace this with actual data.
  const { posts, getPosts } = useGlobalContext();

  const sortPosts = (sortOrder) => {
    getPosts(sortOrder);
  };

  return (
    <div className="container home">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-2 left-column">
          <div className="sort-section">
            <p className="text-center text-lg font-normal	">Sort with</p>
            <div className="buttons-row">
              <button
                className="btn btn-sort"
                onClick={() => sortPosts('newest')}
              >
                Newest
              </button>
              <button
                className="btn btn-sort"
                onClick={() => sortPosts('oldest')}
              >
                Oldest
              </button>
              <button
                className="btn btn-sort"
                onClick={() => sortPosts('most-comments')}
              >
                Most comments
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-md-8 posts-column">
          {/* Switch buttons for Lost and Found */}
          <div className="switch-buttons">
            <SwitchButtons postType={postType} setPostType={setPostType} />
          </div>
          {user && (
            <div className="mb-5">
              <PostComposer postType={postType} setPostType={setPostType} />
            </div>
          )}
          <div className="posts">
            {posts &&
              posts
                .filter((post) => post.category === postType)
                .map((post) => <Post key={post._id} post={post} />)}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-2 right-column">
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
