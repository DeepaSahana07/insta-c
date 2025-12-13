import jwt from 'jsonwebtoken';
//import bcrypt from "bcryptjs";
import User from '../models/User.js';
//import cloudinary from '../config/cloudinary.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
      });
    }

    let profilePicture = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';

    // Upload profile picture if provided
    // if (req.file) {
    //   const result = await cloudinary.uploader.upload_stream(
    //     { folder: 'instagram-clone/profiles' },
    //     (error, result) => {
    //       if (error) throw error;
    //       return result;
    //     }
    //   );
      
    //   const uploadPromise = new Promise((resolve, reject) => {
    //     const stream = cloudinary.uploader.upload_stream(
    //       { folder: 'instagram-clone/profiles' },
    //       (error, result) => {
    //         if (error) reject(error);
    //         else resolve(result);
    //       }
    //     );
    //     stream.end(req.file.buffer);
    //   });

    //   const uploadResult = await uploadPromise;
    //   profilePicture = uploadResult.secure_url;
    //}


    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName,
      profilePicture
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        followers: user.followers,
        following: user.following,
        posts: user.posts
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        followers: user.followers,
        following: user.following,
        posts: user.posts
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('followers', 'username profilePicture')
      .populate('following', 'username profilePicture')
      .populate('posts');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};