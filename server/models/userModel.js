import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
      type: String,
      //required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      //select: false
    },
    picture: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9K8dExVjguM0ghGKa5IjOyZMRBAaO_AMYNMNUBqHp0w&s=10"
    }
  },
  {
    strict: "throw",
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password
userSchema.methods.comparePassword = (async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
})

const User = model("User", userSchema);

export default User;