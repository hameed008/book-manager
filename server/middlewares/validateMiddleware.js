import { error } from "console";
import mongoose from "mongoose";

//* Validating id
export default function (req, res, next, id) {
 id = Array.isArray(id)? id[0] : id;
  if (!mongoose.isObjectIdOrHexString(id) ) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }
  next();
}
