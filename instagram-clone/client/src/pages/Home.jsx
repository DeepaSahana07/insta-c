import React, { useState, useEffect } from 'react';
import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import freeApiService from '../services/freeApiService';
import { fakePosts } from '../services/fakeData';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiPosts = await freeApiService.getPosts(15);
        setPosts(apiPosts);
      } catch (error) {
        console.log('Using fallback data');
        setPosts(fakePosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="main-content">
      <div className="home-layout">
        <div className="feed-container">
          <Stories />
          
          {loading ? (
            <div>Loading posts...</div>
          ) : (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
        </div>
        
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;