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
        // Get user posts from localStorage
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        
        // Get API posts
        const apiPosts = await freeApiService.getPosts(15);
        
        // Combine user posts with API posts
        const allPosts = [...userPosts, ...apiPosts];
        setPosts(allPosts);
      } catch (error) {
        console.log('Using fallback data');
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        setPosts([...userPosts, ...fakePosts]);
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