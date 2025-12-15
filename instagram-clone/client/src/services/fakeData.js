// Fake data for Instagram clone
export const fakeUsers = [
  {
    id: '1',
    username: 'aesthetic.vibes',
    fullName: 'Aesthetic Vibes',
    profilePicture: '/src/assets/user1.jpg',
    isVerified: false,
    followers: 1250,
    following: 890,
    posts: 45
  },
  {
    id: '2',
    username: 'moonlight.dreams',
    fullName: 'Moonlight Dreams',
    profilePicture: '/src/assets/user2.jpg',
    isVerified: false,
    followers: 2100,
    following: 456,
    posts: 78
  },
  {
    id: '3',
    username: 'golden.hour',
    fullName: 'Golden Hour',
    profilePicture: '/src/assets/user3.jpg',
    isVerified: false,
    followers: 890,
    following: 234,
    posts: 32
  },
  {
    id: '4',
    username: 'vintage.soul',
    fullName: 'Vintage Soul',
    profilePicture: '/src/assets/user4.jpg',
    isVerified: false,
    followers: 3400,
    following: 567,
    posts: 89
  },
  {
    id: '5',
    username: 'ocean.waves',
    fullName: 'Ocean Waves',
    profilePicture: '/src/assets/user5.jpg',
    isVerified: false,
    followers: 1890,
    following: 345,
    posts: 56
  },
  {
    id: '6',
    username: 'starry.nights',
    fullName: 'Starry Nights',
    profilePicture: '/src/assets/user6.jpg',
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
    image: '/src/assets/img1.jpg',
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
    image: '/src/assets/img2.jpg',
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
    image: '/src/assets/img3.jpg',
    caption: 'Adventure awaits! 🏔️ #hiking #mountains #adventure #nature',
    likes: 2156,
    comments: [
      { id: '5', user: fakeUsers[4], text: 'Incredible view! Where is this?', createdAt: '2h' },
      { id: '6', user: fakeUsers[5], text: 'Need to visit this place! 🙌', createdAt: '1h' }
    ],
    createdAt: '8h',
    location: 'Rocky Mountains, CO'
  }
];

export const suggestedUsers = [
  {
    id: '7',
    username: 'dreamy.aesthetics',
    fullName: 'Dreamy Aesthetics',
    profilePicture: '/src/assets/user7.jpg',
    mutualFollowers: ['aesthetic.vibes'],
    isFollowing: false
  },
  {
    id: '8',
    username: 'wanderlust.soul',
    fullName: 'Wanderlust Soul',
    profilePicture: '/src/assets/user8.jpg',
    mutualFollowers: ['golden.hour'],
    isFollowing: false,
    isVerified: true
  }
];

export const currentUser = {
  id: 'current',
  username: 'sahana_8607',
  fullName: 'Deepa Sahana',
  profilePicture: '/src/assets/flower.jpg.jpg',
  followers: 1456,
  following: 892,
  posts: 67,
  bio: 'Living life one post at a time ✨'
};