// Post.js

import React, { useState } from 'react';
import './Post.css'; // Make sure to create a Post.css file for styling
import avatar from '../../img/avatar-placeholder.png';
import CommentSection from './CommentSection/CommentSection';
import CommentComposer from './CommentSection/CommentComposer';
import {
  FaLocationArrow,
  FaMap,
  FaMapMarked,
  FaMapMarkedAlt,
  FaMapMarker,
  FaMapPin,
  FaMapSigns,
  FaRegMap,
  FaSearch,
  FaSearchLocation,
} from 'react-icons/fa';
import '../PostComposer/MapChooser/MapChooser.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
});

function Post({ post }) {
  const { t } = useTranslation();
  console.log(post.location.coordinates);

  // Dummy data for the example, you would replace this with actual props or state
  const postInfo = {
    author: post.userId.username,
    title: post.title,
    tags: post.tags,
    date: post.createdAt.slice(0, 10),
    time: post.createdAt.slice(11, 16),
    description: post.text || '',
    imageUrl: '../../img/boots.jpg',
    comments: post.comments,
    location: post.location,
  };
  console.log('postInfo: ', post);

  const [showComments, setShowComments] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      {/* This is an example component */}
      <div className="flex items-center justify-center mb-5">
        {' '}
        <div className="rounded-xl border p-4 shadow-md w-full bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <div
                className="h-8 w-8 rounded-full bg-slate-400"
                style={{
                  backgroundImage: `${avatar}`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />{' '}
              <div className="text-lg font-bold text-slate-700">
                {' '}
                {postInfo.author}{' '}
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                {postInfo.tags[0] ? postInfo.tags[0] : t('No tags')}
              </button>
              <div className="text-xs text-neutral-500">
                {/* if today, display the hour, if not today, display the date */}
                {postInfo.date === new Date().toISOString().slice(0, 10)
                  ? t('Today') + ', ' + postInfo.time
                  : postInfo.date}
              </div>
            </div>
          </div>
          <div className="mt-4 mb-6">
            <div className="mb-3 font-bold text-center text-gray-500 text-sm width-full">
              {post.category === 'LOST' ? t('Lost') : t('Found')} {post.title}
            </div>
            <div className="text-neutral-600 px-2 text-md">
              {postInfo.description ? postInfo.description : ''}
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex justify-between w-full px-2">
                {/* center left */}
                <div className="flex space-x-6 md:space-x-6">
                  <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span>4</span>
                  </div>
                  <div
                    className="flex cursor-pointer items-center transition hover:text-slate-600"
                    onClick={toggleComments}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <span>
                      {!postInfo.comments ? '0' : postInfo.comments.length}
                    </span>
                  </div>
                </div>
                {postInfo.location &&
                  postInfo.location.coordinates &&
                  postInfo.location.coordinates[0] &&
                  postInfo.location.coordinates[1] && (
                    <div
                      className="flex cursor-pointer items-center transition hover:text-slate-600"
                      onClick={() => toggleShowMap()}
                    >
                      {/* Fa Map icon */}
                      <FaSearchLocation className="mr-1.5 h-4 w-4" />
                      {/* <FaSearch className="mr-1.5 h-4 w-4" /> */}
                      <span className="text-sm font-normal">{t('Location')}</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {showMap ? (
            <div className="map-chooser-container">
              <div className="map-chooser">
                <MapContainer
                  center={
                    post.location.coordinates || [
                      52.220558592308336, 21.00985851319848,
                    ]
                  }
                  zoom={18}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {post.location.coordinates && (
                    <Marker position={post.location.coordinates} icon={icon}>
                      <Popup>{t('Your lost item estimated location')}</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {showComments ? (
            <CommentSection comments={postInfo.comments} postId={post._id} />
          ) : (
            <div>
              <div className="separator mt-4 mb-2 mx-3"></div>
              <div
                onClick={function () {
                  setShowComments(true);
                }}
              >
                <CommentComposer isSmall={true} postId={post._id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
