import axios from 'axios';

// Free API service using only free APIs
class FreeAPIService {
  constructor() {
    this.jsonPlaceholder = 'https://jsonplaceholder.typicode.com';
    this.picsum = 'https://picsum.photos';
    this.randomUser = 'https://randomuser.me/api';
  }

  // Get posts from JSONPlaceholder
  async getPosts(limit = 10) {
    try {
      const response = await axios.get(`${this.jsonPlaceholder}/posts?_limit=${limit}`);
      const posts = response.data;
      
      // Enhance posts with images and user data
      const enhancedPosts = await Promise.all(posts.map(async (post, index) => {
        const userResponse = await axios.get(`${this.randomUser}?seed=${post.userId}`);
        const user = userResponse.data.results[0];
        
        return {
          id: post.id,
          caption: post.title,
          content: post.body,
          image: `${this.picsum}/600/600?random=${post.id}`,
          user: {
            id: post.userId,
            username: user.login.username,
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.medium
          },
          likes: Math.floor(Math.random() * 1000) + 10,
          comments: Math.floor(Math.random() * 50) + 1,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          liked: Math.random() > 0.7,
          createdAt: `${Math.floor(Math.random() * 24)}h`
        };
      }));
      
      return enhancedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
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
        
        return {
          id: comment.id,
          text: comment.body.substring(0, 100),
          user: {
            username: user.login.username,
            avatar: user.picture.thumbnail
          },
          createdAt: `${Math.floor(Math.random() * 24)}h`
        };
      }));
      
      return enhancedComments;
    } catch (error) {
      return [];
    }
  }

  // Fallback data when APIs fail
  getFallbackPosts() {
    return [
      {
        id: 1,
        caption: 'Beautiful sunset',
        image: '/src/assets/img1.jpg',
        user: { username: 'demo_user', avatar: '/src/assets/user1.jpg' },
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
    const likes = JSON.parse(localStorage.getItem('likes') || '{}');
    likes[postId] = !likes[postId];
    localStorage.setItem('likes', JSON.stringify(likes));
    return Promise.resolve({ liked: likes[postId] });
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