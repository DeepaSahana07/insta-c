// Fake data for Instagram clone
export const fakeUsers = [
  {
    id: '1',
    username: 'aesthetic.vibes',
    fullName: 'Aesthetic Vibes',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 1250,
    following: 890,
    posts: 45
  },
  {
    id: '2',
    username: 'moonlight.dreams',
    fullName: 'Moonlight Dreams',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 2100,
    following: 456,
    posts: 78
  },
  {
    id: '3',
    username: 'golden.hour',
    fullName: 'Golden Hour',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 890,
    following: 234,
    posts: 32
  },
  {
    id: '4',
    username: 'vintage.soul',
    fullName: 'Vintage Soul',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 3400,
    following: 567,
    posts: 89
  },
  {
    id: '5',
    username: 'ocean.waves',
    fullName: 'Ocean Waves',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 1890,
    following: 345,
    posts: 56
  },
  {
    id: '6',
    username: 'starry.nights',
    fullName: 'Starry Nights',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isVerified: false,
    followers: 2567,
    following: 678,
    posts: 123
  }
];

export const fakePosts = [
  {
    id: '1',
    user: fakeUsers[0],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'Beautiful sunset at the beach 🌅 #sunset #beach #nature',
    likes: 1234,
    comments: [
      { id: '1', user: fakeUsers[1], text: 'Amazing shot! 📸', createdAt: '2h' },
      { id: '2', user: fakeUsers[2], text: 'Love this view! 😍', createdAt: '1h' }
    ],
    createdAt: '3h',
    location: 'Malibu Beach, CA'
  },
  {
    id: '2',
    user: fakeUsers[1],
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop',
    caption: 'Coffee and code ☕️💻 Perfect morning combo! #coding #coffee #developer',
    likes: 892,
    comments: [
      { id: '3', user: fakeUsers[0], text: 'That setup looks clean! 🔥', createdAt: '30m' },
      { id: '4', user: fakeUsers[3], text: 'What IDE are you using?', createdAt: '15m' }
    ],
    createdAt: '5h',
    location: 'San Francisco, CA'
  },
  {
    id: '3',
    user: fakeUsers[2],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop',
    caption: 'Adventure awaits! 🏔️ #hiking #mountains #adventure #nature',
    likes: 2156,
    comments: [
      { id: '5', user: fakeUsers[4], text: 'Incredible view! Where is this?', createdAt: '2h' },
      { id: '6', user: fakeUsers[5], text: 'Need to visit this place! 🙌', createdAt: '1h' }
    ],
    createdAt: '8h',
    location: 'Rocky Mountains, CO'
  },
  {
    id: '4',
    user: fakeUsers[3],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop',
    caption: 'Homemade pizza night! 🍕 Nothing beats fresh ingredients #foodie #pizza #homemade',
    likes: 567,
    comments: [
      { id: '7', user: fakeUsers[0], text: 'Looks delicious! Recipe please? 🤤', createdAt: '45m' }
    ],
    createdAt: '12h',
    location: 'New York, NY'
  },
  {
    id: '5',
    user: fakeUsers[4],
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=600&fit=crop',
    caption: 'City lights never get old ✨ #citylife #nightphotography #urban',
    likes: 1789,
    comments: [
      { id: '8', user: fakeUsers[2], text: 'Beautiful capture! 📷', createdAt: '3h' },
      { id: '9', user: fakeUsers[1], text: 'Love the composition 👌', createdAt: '2h' }
    ],
    createdAt: '1d',
    location: 'Tokyo, Japan'
  },
  {
    id: '6',
    user: fakeUsers[5],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
    caption: 'Weekend vibes at the local market 🛒 Fresh produce and good energy! #weekend #market #fresh',
    likes: 934,
    comments: [
      { id: '10', user: fakeUsers[3], text: 'Love supporting local! 💚', createdAt: '4h' }
    ],
    createdAt: '2d',
    location: 'Portland, OR'
  }
];

export const suggestedUsers = [
  {
    id: '7',
    username: 'dreamy.aesthetics',
    fullName: 'Dreamy Aesthetics',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    mutualFollowers: ['aesthetic.vibes'],
    isFollowing: false
  },
  {
    id: '8',
    username: 'wanderlust.soul',
    fullName: 'Wanderlust Soul',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    mutualFollowers: ['golden.hour'],
    isFollowing: false,
    isVerified: true
  },
  {
    id: '9',
    username: 'minimalist.life',
    fullName: 'Minimalist Life',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    mutualFollowers: ['moonlight.dreams'],
    isFollowing: false
  },
  {
    id: '10',
    username: 'cosmic.energy',
    fullName: 'Cosmic Energy',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    mutualFollowers: ['starry.nights'],
    isFollowing: false,
    isVerified: true
  },
  {
    id: '11',
    username: 'serene.moments',
    fullName: 'Serene Moments',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    mutualFollowers: ['ocean.waves'],
    isFollowing: false
  }
];

export const currentUser = {
  id: 'current',
  username: 'sahana_8607',
  fullName: 'Deepa Sahana',
  profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  followers: 1456,
  following: 892,
  posts: 67,
  bio: 'Living life one post at a time ✨'
};