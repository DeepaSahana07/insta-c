import React, { useState, useEffect } from 'react';
import Stories from '../components/Stories';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch both user posts and demo posts
        const [userPostsResponse, demoPostsResponse] = await Promise.allSettled([
          apiService.getPosts(),
          apiService.getDemoPosts()
        ]);
        
        const userPosts = userPostsResponse.status === 'fulfilled' && userPostsResponse.value.data.success 
          ? userPostsResponse.value.data.posts 
          : [];
          
        const demoPosts = demoPostsResponse.status === 'fulfilled' 
          ? demoPostsResponse.value.data || []
          : [];
        
        // Generate additional demo posts if needed to reach 30+
        const aestheticUsernames = [
          'wanderlust_soul', 'coffee_vibes', 'sunset_chaser', 'ocean_dreams', 'city_lights',
          'nature_lover', 'art_enthusiast', 'foodie_adventures', 'travel_diaries', 'creative_mind',
          'golden_hour', 'street_photographer', 'minimalist_life', 'vintage_soul', 'modern_nomad',
          'dreamy_skies', 'urban_explorer', 'peaceful_moments', 'adventure_seeker', 'artistic_vision',
          'morning_light', 'evening_glow', 'wild_heart', 'free_spirit', 'captured_moments'
        ];
        
        const fullNames = [
          'Emma Johnson', 'Alex Rivera', 'Maya Patel', 'Jordan Smith', 'Zoe Chen',
          'Lucas Brown', 'Aria Wilson', 'Noah Davis', 'Luna Garcia', 'Kai Thompson',
          'Sage Martinez', 'River Jones', 'Phoenix Lee', 'Sky Anderson', 'Indie Taylor',
          'Rowan Blake', 'Sage Cooper', 'River Stone', 'Luna Rose', 'Atlas Grey',
          'Nova Star', 'Iris Moon', 'Orion Vale', 'Willow Rain', 'Cedar Fox'
        ];
        
        const additionalPosts = [];
        for (let i = 0; i < 25; i++) {
          const category = getImageCategory(i);
          additionalPosts.push({
            id: `extra-${i}`,
            _id: `extra-${i}`,
            image: `https://picsum.photos/600/600?random=${1000 + i}`,
            caption: getRelevantCaptionByCategory(category, i),
            user: {
              username: aestheticUsernames[i],
              profilePicture: `https://i.pravatar.cc/150?img=${i + 10}`,
              fullName: fullNames[i]
            },
            likes: Math.floor(Math.random() * 500) + 10,
            comments: [],
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          });
        }
        
        // Combine all posts and ensure uniqueness
        const allPosts = [...userPosts, ...demoPosts, ...additionalPosts]
          .filter((post, index, self) => 
            index === self.findIndex(p => (p._id || p.id) === (post._id || post.id))
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 35);
        
        setPosts(allPosts);
      } catch (error) {
        console.log('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    const getImageCategory = (index) => {
      const categories = ['nature', 'city', 'food', 'travel', 'lifestyle'];
      return categories[index % categories.length];
    };
    
    const getRelevantCaptionByCategory = (category, index) => {
      const captions = {
        nature: [
          'Lost in the beauty of nature 🌿 Sometimes you need to disconnect to reconnect.',
          'Golden hour magic in the wilderness ✨ Nature is the best therapy.',
          'Breathing in the fresh mountain air 🏔️ This view never gets old.',
          'Where the wild things are 🦋 Finding peace in the great outdoors.',
          'Sunset vibes and good times 🌅 Grateful for moments like these.'
        ],
        city: [
          'Urban exploration at its finest 🏙️ Every street tells a story.',
          'City lights and midnight dreams ✨ The energy here is unmatched.',
          'Concrete jungle adventures 🌆 Finding beauty in the chaos.',
          'Street photography vibes 📸 Capturing the soul of the city.',
          'Rooftop views and city blues 🌃 This perspective hits different.'
        ],
        food: [
          'Foodie paradise found 🍽️ When the presentation matches the taste.',
          'Taste buds in heaven 😋 This culinary masterpiece made my day.',
          'Good food, good mood, good life ❤️ Simple pleasures matter most.',
          'Brunch vibes and weekend feels ☕ Perfect start to a perfect day.',
          'Homemade with love 👨‍🍳 Nothing beats comfort food done right.'
        ],
        travel: [
          'Wanderlust satisfied ✈️ This place exceeded all my expectations.',
          'Adventure awaits around every corner 🗺️ Collecting memories, not things.',
          'Passport stamps and new horizons 🌍 Travel opens your mind and soul.',
          'Off the beaten path discoveries 🧭 The best adventures are unplanned.',
          'Local vibes and authentic experiences 🎒 This is what travel is about.'
        ],
        lifestyle: [
          'Living my best life, one moment at a time ✨ Grateful for the journey.',
          'Simple pleasures and genuine smiles 😊 Finding joy in everyday moments.',
          'Self-care Sunday vibes 🛁 Taking time to recharge and reflect.',
          'Morning rituals and positive energy ☀️ Starting the day with intention.',
          'Cozy evenings and good books 📚 Perfect way to unwind after a long day.'
        ]
      };
      return captions[category][index % captions[category].length];
    };

    if (user) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="main-content">
      <div className="home-layout">
        <div className="feed-container">
          <Stories />
          
          {loading ? (
            <div className="text-gray-900 dark:text-white text-center py-8">Loading posts...</div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <Post key={post._id || post.id} post={post} />
            ))
          ) : (
            <div className="no-posts text-center py-8">
              <p className="text-gray-900 dark:text-white">No posts to show. Follow some users or create your first post!</p>
            </div>
          )}
        </div>
        
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;