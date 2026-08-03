import { ObjectId } from "mongodb";
import User from "../models/userModel.js";
import { json } from "stream/consumers";
import crypto from "node:crypto"
import Session from "../models/sessionModel.js";

const checkAuth = async (req, res, next) => {
  let { sid } = req.signedCookies;
  if (!sid) {
    res.clearCookie("sid");
    return res.status(401).json({ error: "Unauthenticated User" });
  }

  const session = await Session.findById(sid);
  if (!session) {
    res.clearCookie("sid");
    return res.status(401).json({ error: "Unauthenticated User" });
  }

  const user = await User.findOne({ _id: session.userId }).lean();

  if (!user) {
    return res.status(401).json({ error: "Unauthenticated User" });
  }

  req.user = user;
  next()
}

export default checkAuth
