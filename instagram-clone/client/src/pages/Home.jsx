import React from 'react';
import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { fakePosts } from '../services/fakeData';

const Home = () => {
  return (
    <div className="main-content">
      <div className="home-layout">
        <div className="feed-container">
          <Stories />
          
          {fakePosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;