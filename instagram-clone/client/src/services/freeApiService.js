import axios from 'axios';

// Free API service using only free APIs
class FreeAPIService {
  constructor() {
    this.jsonPlaceholder = 'https://jsonplaceholder.typicode.com';
    this.picsum = 'https://picsum.photos';
    this.randomUser = 'https://randomuser.me/api';
  }

  // Get posts from JSONPlaceholder
  async getPosts(limit = 15) {
    try {
      const response = await axios.get(`${this.jsonPlaceholder}/posts?_limit=${limit}`, {
        timeout: 10000,
        retry: 3,
        retryDelay: 1000
      });
      const posts = response.data;
      
      // Enhance posts with images and user data
      const enhancedPosts = await Promise.all(posts.map(async (post, index) => {
        const userResponse = await axios.get(`${this.randomUser}?seed=${post.userId}`);
        const user = userResponse.data.results[0];
        
        // Generate relevant captions based on image category
        const imageCategories = [
          { type: 'nature', captions: [
            'Nature never fails to amaze me with its endless beauty 🌿',
            'Found this peaceful spot during my morning hike. Pure serenity.',
            'Sometimes you need to disconnect to reconnect with nature.',
            'Golden hour magic in the great outdoors ✨'
          ]},
          { type: 'city', captions: [
            'City lights and urban nights. Love the energy here! 🏙️',
            'Architecture tells the story of human creativity and ambition.',
            'Exploring hidden corners of the city, one street at a time.',
            'The hustle and bustle never gets old in this concrete jungle.'
          ]},
          { type: 'food', captions: [
            'Good food = good mood. This was absolutely delicious! 🍽️',
            'Trying new flavors and loving every bite of this culinary adventure.',
            'Food brings people together and creates the best memories.',
            'When the presentation is as good as the taste 👨‍🍳'
          ]},
          { type: 'travel', captions: [
            'Wanderlust satisfied. This place exceeded all expectations! ✈️',
            'Travel opens your mind to new perspectives and endless possibilities.',
            'Collecting moments, not things. This trip was unforgettable.',
            'Every destination has a story to tell. This one spoke to my soul.'
          ]},
          { type: 'lifestyle', captions: [
            'Living my best life, one moment at a time 💫',
            'Simple pleasures bring the greatest joy to everyday life.',
            'Grateful for these perfect moments that make life beautiful.',
            'Finding happiness in the little things that matter most.'
          ]}
        ];
        
        const categoryIndex = index % imageCategories.length;
        const category = imageCategories[categoryIndex];
        const captionIndex = Math.floor(Math.random() * category.captions.length);
        
        const aestheticUsernames = [
          'wanderlust_soul', 'coffee_vibes', 'sunset_chaser', 'ocean_dreams', 'city_lights',
          'nature_lover', 'art_enthusiast', 'foodie_adventures', 'travel_diaries', 'creative_mind',
          'golden_hour', 'street_photographer', 'minimalist_life', 'vintage_soul', 'modern_nomad'
        ];
        
        return {
          id: post.id,
          caption: category.captions[captionIndex],
          content: post.body,
          image: `${this.picsum}/600/600?random=${post.id + index * 100}`,
          user: {
            id: post.userId,
            username: aestheticUsernames[index % aestheticUsernames.length] || user.login.username,
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.medium
          },
          likes: Math.floor(Math.random() * 1000) + 10,
          comments: [],
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          liked: Math.random() > 0.7,
          createdAt: `${Math.floor(Math.random() * 24)}h`
        };
      }));
      
      return enhancedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error.code || error.message);
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        // Try alternative endpoint
        try {
          const fallbackResponse = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
            timeout: 5000
          });
          const fallbackCaptions = [
            'Captured this beautiful moment during my afternoon stroll 🌅',
            'Sometimes the best shots are the unexpected ones 📸',
            'Finding beauty in everyday moments that matter most.',
            'Perfect lighting makes all the difference in photography ✨',
            'Grateful for these peaceful moments of pure tranquility.',
            'Every day brings new discoveries and adventures to explore.',
            'Simple pleasures bring the greatest joy to life 😊',
            'Life is full of beautiful surprises waiting to be found.',
            'Taking time to appreciate the little things around us.',
            'Another day, another adventure in this amazing journey.'
          ];
          
          const aestheticUsernames = [
            'wanderlust_soul', 'coffee_vibes', 'sunset_chaser', 'ocean_dreams', 'city_lights',
            'nature_lover', 'art_enthusiast', 'foodie_adventures', 'travel_diaries', 'creative_mind'
          ];
          
          return fallbackResponse.data.map((post, index) => ({
            id: post.id,
            caption: fallbackCaptions[index % fallbackCaptions.length],
            image: `https://picsum.photos/600/600?random=${post.id}`,
            user: { 
              username: aestheticUsernames[index % aestheticUsernames.length],
              avatar: `https://i.pravatar.cc/150?img=${post.userId}` 
            },
            likes: Math.floor(Math.random() * 100),
            comments: [],
            createdAt: '1h'
          }));
        } catch (fallbackError) {
          return this.getFallbackPosts();
        }
      }
      return this.getFallbackPosts();
    }
  }

  // Get users from Random User API
  async getUsers(count = 10) {
    try {
      const response = await axios.get(`${this.randomUser}?results=${count}`);
      return response.data.results.map((user, index) => ({
        id: index + 1,
        username: user.login.username,
        name: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.medium,
        profilePicture: user.picture.medium,
        followers: Math.floor(Math.random() * 10000) + 100,
        following: Math.floor(Math.random() * 1000) + 50,
        posts: Math.floor(Math.random() * 100) + 10,
        bio: `${user.name.first}'s Instagram profile`,
        isFollowing: Math.random() > 0.5,
        mutualFollowers: ['friend1', 'friend2']
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return this.getFallbackUsers();
    }
  }

  // Get comments for a post
  async getComments(postId, limit = 5) {
    try {
      const response = await axios.get(`${this.jsonPlaceholder}/comments?postId=${postId}&_limit=${limit}`);
      const comments = response.data;
      
      const enhancedComments = await Promise.all(comments.map(async (comment) => {
        const userResponse = await axios.get(`${this.randomUser}?seed=${comment.id}`);
        const user = userResponse.data.results[0];
        
        // Filter to English-like comments only
        const englishText = comment.body.replace(/[^\x00-\x7F]/g, '').substring(0, 100);
        if (englishText.length < 10) return null;
        
        return {
          id: comment.id,
          text: englishText,
          user: {
            username: user.login.username,
            avatar: user.picture.thumbnail
          },
          createdAt: `${Math.floor(Math.random() * 24)}h`
        };
      }));
      
      return enhancedComments.filter(comment => comment !== null);
    } catch (error) {
      return [];
    }
  }

  // Fallback data when APIs fail
  getFallbackPosts() {
    return [
      {
        id: 1,
        caption: 'Lost in the beauty of this ancient library 📚 Every book holds a universe of stories waiting to be discovered.',
        image: '/src/assets/img1.jpg',
        user: { username: 'bookworm_soul', avatar: '/src/assets/user1.jpg' },
        likes: 123,
        comments: [],
        createdAt: '2h'
      }
    ];
  }

  getFallbackUsers() {
    return [
      {
        id: 1,
        username: 'demo_user',
        name: 'Demo User',
        avatar: '/src/assets/user1.jpg',
        profilePicture: '/src/assets/user1.jpg',
        followers: 100,
        following: 50,
        posts: 10
      }
    ];
  }

  // Simulate like action
  likePost(postId) {
    const globalLikes = JSON.parse(localStorage.getItem('globalLikes') || '{}');
    const currentLike = globalLikes[postId] || { liked: false, count: 0 };
    
    globalLikes[postId] = {
      liked: !currentLike.liked,
      count: currentLike.liked ? currentLike.count - 1 : currentLike.count + 1
    };
    
    localStorage.setItem('globalLikes', JSON.stringify(globalLikes));
    return Promise.resolve({ liked: globalLikes[postId].liked, count: globalLikes[postId].count });
  }

  // Simulate follow action
  followUser(userId) {
    const follows = JSON.parse(localStorage.getItem('follows') || '{}');
    follows[userId] = !follows[userId];
    localStorage.setItem('follows', JSON.stringify(follows));
    return Promise.resolve({ following: follows[userId] });
  }
}

export default new FreeAPIService();