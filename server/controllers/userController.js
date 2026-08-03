import { ObjectId } from "mongodb";
import User from "../models/userModel.js";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import Session from "../models/sessionModel.js";
import OTP from "../models/otpModel.js";


export const signupUser = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or Expired OTP!" });
    }

    await otpRecord.deleteOne();


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // Check Session Count
    const allSessions = await Session.find({ userId: user._id, });
    if (allSessions.length >= 2) {
      await allSessions[0].deleteOne()
    }

    // Create Session 
    const session = await Session.create({ userId: user._id, });

    // Set the httpOnly cookie
    res.cookie('sid', session.id, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict', 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Server error during sign up' });
  }
};


export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const sanitizedEmail = email.toLowerCase().trim() // Sanitizing email

  const user = await User.findOne({ email: sanitizedEmail });

  if (!user) {
    return res.status(404).json({ error: "Invalid email or password" })
  };

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(404).json({ error: "Invalid email or password" });
  };

  // Check Session Count
  const allSessions = await Session.find({ userId: user._id, });

  if (allSessions.length >= 2) {
    await allSessions[0].deleteOne()
  }

  // Create Session 
  const session = await Session.create({ userId: user._id, });

  //? Sending signed "session id" or signed "cookie" ( using cookie-parser ) to client.
  res.cookie("sid", session.id, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict',
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ message: "Logged In" });
}


export const getUserProfile = (req, res) => {
  return res.status(200).json({
    user: {
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture
    }
  })
}

export const logoutUser = async (req, res) => {
  let { sid } = req.signedCookies;
  await Session.findByIdAndDelete(sid)
  res.clearCookie("sid")
  return res.status(204).end()
}
