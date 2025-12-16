import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        // Generate unique explore posts
        const explorePosts = [];
        const usedSeeds = new Set();
        
        // Create 35 unique posts
        for (let i = 0; i < 35; i++) {
          let seed = Math.floor(Math.random() * 10000) + i * 100;
          while (usedSeeds.has(seed)) {
            seed = Math.floor(Math.random() * 10000) + i * 100;
          }
          usedSeeds.add(seed);
          
          const categories = ['nature', 'city', 'food', 'travel', 'art'];
          const category = categories[i % categories.length];
          
          const aestheticUsernames = [
            'wanderlust_soul', 'coffee_vibes', 'sunset_chaser', 'ocean_dreams', 'city_lights',
            'nature_lover', 'art_enthusiast', 'foodie_adventures', 'travel_diaries', 'creative_mind',
            'golden_hour', 'street_photographer', 'minimalist_life', 'vintage_soul', 'modern_nomad',
            'dreamy_skies', 'urban_explorer', 'peaceful_moments', 'adventure_seeker', 'artistic_vision',
            'morning_light', 'evening_glow', 'wild_heart', 'free_spirit', 'captured_moments',
            'rowan_blake', 'sage_cooper', 'river_stone', 'luna_rose', 'atlas_grey',
            'nova_star', 'iris_moon', 'orion_vale', 'willow_rain', 'cedar_fox',
            'storm_chaser', 'pixel_perfect', 'midnight_muse', 'golden_ratio', 'frame_by_frame'
          ];
          
          const fullNames = [
            'Emma Johnson', 'Alex Rivera', 'Maya Patel', 'Jordan Smith', 'Zoe Chen',
            'Lucas Brown', 'Aria Wilson', 'Noah Davis', 'Luna Garcia', 'Kai Thompson',
            'Sage Martinez', 'River Jones', 'Phoenix Lee', 'Sky Anderson', 'Indie Taylor',
            'Rowan Blake', 'Sage Cooper', 'River Stone', 'Luna Rose', 'Atlas Grey',
            'Nova Star', 'Iris Moon', 'Orion Vale', 'Willow Rain', 'Cedar Fox',
            'Storm Chase', 'Pixel Perfect', 'Midnight Muse', 'Golden Ratio', 'Frame Foster',
            'Sage Rivers', 'Luna Wilde', 'Atlas Stone', 'Nova Grey', 'Iris Vale'
          ];
          
          explorePosts.push({
            _id: `explore-${seed}`,
            id: `explore-${seed}`,
            image: `https://picsum.photos/400/400?random=${seed}`,
            caption: getExploreCaption(category, i),
            user: {
              username: aestheticUsernames[i % aestheticUsernames.length],
              profilePicture: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
              fullName: fullNames[i % fullNames.length]
            },
            likes: Math.floor(Math.random() * 1000) + 50,
            comments: Array.from({ length: Math.floor(Math.random() * 10) }, (_, j) => ({
              id: j,
              text: 'Amazing shot!',
              user: { username: `user${j}` }
            }))
          });
        }
        
        setPosts(explorePosts);
      } catch (error) {
        console.log('Error generating explore posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    const getExploreCaption = (category, index) => {
      const captions = {
        nature: [
          'Lost in the beauty of nature 🌿',
          'Where the wild things are 🌲',
          'Nature is the best therapy 🌅',
          'Breathing in the fresh mountain air 🏔️'
        ],
        city: [
          'Urban exploration at its finest 🏙️',
          'City lights never get old ✨',
          'Concrete jungle adventures 🏭',
          'Street photography vibes 📷'
        ],
        food: [
          'Foodie paradise found 🍴',
          'Taste buds in heaven 😋',
          'Culinary masterpiece 👨‍🍳',
          'Food is love, food is life ❤️'
        ],
        travel: [
          'Wanderlust satisfied ✈️',
          'Adventure awaits around every corner 🗺️',
          'Collecting passport stamps 💼',
          'Travel far, travel wide 🌍'
        ],
        art: [
          'Art speaks where words fail 🎨',
          'Creative expression at its peak ✨',
          'Beauty in every brushstroke 🖌️',
          'Inspiration found in unexpected places 💡'
        ]
      };
      return captions[category][index % captions[category].length];
    };

    fetchExplorePosts();
  }, []);

  if (loading) {
    return (
      <div className="main-content">
        <div className="explore-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="explore-container">
        <div className="explore-grid">
          {posts.map((post) => (
            <div key={post._id || post.id} className="explore-item">
              <img
                src={post.image}
                alt={`Post by ${post.user?.username || 'user'}`}
                className="explore-image"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`;
                }}
              />
              <div className="explore-overlay">
                <div className="explore-stats">
                  <span><i className="bi bi-heart-fill"></i> {post.likes?.length || 0}</span>
                  <span><i className="bi bi-chat-fill"></i> {post.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;