# Instagram Clone - MERN Stack

A complete, production-ready Instagram clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

### Authentication
- User registration with profile picture upload
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt

### Posts
- Create posts with image upload
- Like/unlike posts
- Comment on posts
- Delete own posts
- Feed shows posts from followed users

### Users
- Follow/unfollow users
- View user profiles with posts, followers, following
- Suggested users
- Search users
- Edit profile

### UI/UX
- Instagram-like design and layout
- Responsive design (mobile & desktop)
- Dark/Light mode toggle
- Loading states and error handling
- Bootstrap Icons

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Vite)
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls
- **Bootstrap** + **Bootstrap Icons** for styling
- **CSS** for custom Instagram-like styling

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for file uploads
- **Cloudinary** for image storage
- **CORS** for cross-origin requests

## 📁 Project Structure

```
instagram-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context providers
│   │   ├── services/       # API services
│   │   └── assets/         # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database & Cloudinary config
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   └── server.js          # Entry point
├── thunder-client/        # API testing collection
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd instagram-clone
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Environment Variables
Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram-clone
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

#### Start Backend Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd client
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create a Cluster**
   - Create a new cluster (free tier)
   - Choose your preferred region

3. **Create Database User**
   - Go to Database Access
   - Add a new database user
   - Set username and password

4. **Configure Network Access**
   - Go to Network Access
   - Add IP Address (0.0.0.0/0 for development)

5. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to your `.env` file as `MONGO_URI`

## ☁️ Cloudinary Setup

1. **Create Cloudinary Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account

2. **Get API Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   - Add to your `.env` file

## 🧪 API Testing

### Thunder Client Collection
Import the `thunder-client/instagram-api.json` file into Thunder Client for VS Code to test all API endpoints.

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Users
- `GET /api/users/profile/:username` - Get user profile
- `POST /api/users/follow/:userId` - Follow/unfollow user
- `GET /api/users/suggested` - Get suggested users
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search` - Search users

#### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts/feed` - Get feed posts
- `GET /api/posts/explore` - Get explore posts
- `GET /api/posts/:postId` - Get single post
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comment` - Comment on post
- `DELETE /api/posts/:postId` - Delete post

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Create account on your preferred platform
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL in production

## 🎨 Features Showcase

### Authentication System
- Secure JWT-based authentication
- Profile picture upload during registration
- Protected routes with automatic redirection

### Social Features
- Follow/unfollow users
- Real-time like and comment system
- User suggestions based on network

### Media Management
- Image upload with Cloudinary integration
- Image optimization and CDN delivery
- File type and size validation

### Responsive Design
- Mobile-first approach
- Instagram-like UI/UX
- Dark/Light mode toggle
- Smooth animations and transitions

## 🔧 Development

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Instagram for design inspiration
- MongoDB Atlas for database hosting
- Cloudinary for image management
- Bootstrap for UI components

---

**Note**: This is a clone project for educational purposes. All rights to the Instagram brand and design belong to Meta Platforms, Inc.