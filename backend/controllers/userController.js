import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// Register new user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,

      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating user.",
      success: false,
      error: error.message,
    });
  }
};

// Login user and issue JWT token
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the current role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging in.",
      success: false,
      error: error.message,
    });
  }
};

// Logout user (clear cookie)
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging out.",
      success: false,
      error: error.message,
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, location, education, experience } = req.body;
    // console.log(fullname, email, phoneNumber, bio, skills, location, education, experience);
    const file=req.file;
    const fileUri=getDataUri(file); 
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);


    // Ensure the userId is available from req.id (set by authenticate middleware)
    const userId = req.id; 
    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing or invalid",
        success: false,
      });
    }

    let user = await User.findById(userId); // Find user by decoded user ID

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Updating user profile data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (location) user.profile.location = location;
    if (skills) user.profile.skills = skills.split(",");

    // Update Education
    if (education) {
      user.profile.education = education.map(item => ({
        degree: item.degree,
        institution: item.institution,
        year: item.year
      }));
    }

    // Update Experience
    if (experience) {
      user.profile.experience = experience.map(item => ({
        role: item.role,
        companyName: item.companyName,
        years: item.years,
        description: item.description
      }));
    }
    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname // Save the original file name
  }

console.log(fullname);
    await user.save(); // Save updated user
console.log(fullname);
    // Return the updated user profile data
    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile.",
      success: false,
      error: error.message,
    });
  }
};

