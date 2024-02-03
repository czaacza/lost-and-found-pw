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
    <div className="container home ">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-2 left-column">
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
        <div className="col-md-8 posts-column">
          {/* Switch buttons for Lost and Found */}
          <div className="switch-buttons">
            <button
              type="button"
              className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700}`}
              onClick={() => setPostType('LOST')}
            >
              Lost
            </button>

            <button
              type="button"
              className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700}`}
              onClick={() => setPostType('FOUND')}
            >
              Found
            </button>
          </div>
          <h2 class="text-3xl font-extrabold dark:text-white">
            Add a new post
          </h2>
          <PostComposer postType={postType} />
          {/* Render posts based on the selected post type */}
          {/* IF POSTS EXIST AND IS ARRAY*/}
          <h2 class="text-3xl font-extrabold dark:text-white  posts-title">
            Recent posts
          </h2>
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
