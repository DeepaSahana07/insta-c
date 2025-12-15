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
    const fetchWithRetry = async (url, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            timeout: 10000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };

    const fetchPosts = async () => {
      try {
        // Get user posts from localStorage
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        
        // Get API posts with retry logic
        const apiPromises = [
          freeApiService.getPosts(8).catch(() => []),
          fetchWithRetry('https://dummyjson.com/posts?limit=7')
            .then(data => data.posts.map((post, index) => ({
              id: `dummy-${post.id}`,
              caption: post.title,
              content: post.body,
              image: `https://picsum.photos/600/600?random=${post.id + 1000}`,
              user: {
                id: post.userId,
                username: `user_${post.userId}`,
                name: `User ${post.userId}`,
                avatar: `https://i.pravatar.cc/150?img=${post.userId}`
              },
              likes: Math.floor(Math.random() * 500) + 50,
              comments: [],
              timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
              liked: false,
              createdAt: `${Math.floor(Math.random() * 24)}h`
            })))
            .catch(() => [])
        ];
        
        const [apiPosts1, apiPosts2] = await Promise.allSettled(apiPromises);
        
        const posts1 = apiPosts1.status === 'fulfilled' ? apiPosts1.value : [];
        const posts2 = apiPosts2.status === 'fulfilled' ? apiPosts2.value : [];
        
        // Combine all posts and ensure uniqueness
        const allPosts = [...userPosts, ...posts1, ...posts2, ...fakePosts]
          .filter((post, index, self) => 
            index === self.findIndex(p => p.id === post.id)
          )
          .slice(0, 15);
        
        setPosts(allPosts);
      } catch (error) {
        console.log('Using fallback data:', error.message);
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        setPosts([...userPosts, ...fakePosts].slice(0, 15));
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