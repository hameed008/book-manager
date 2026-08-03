import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A book must belong to a user'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  tags: {
    type: [String],
    default: [],
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['Want to Read', 'Reading', 'Completed'],
      message: '{VALUE} is not a valid reading status'
    },
    default: 'Want to Read',
    required: true
  }
}, {
  timestamps: true
});

bookSchema.index({ user: 1, status: 1 });
bookSchema.index({ user: 1, tags: 1 });

export default mongoose.models.Book || mongoose.model('Book', bookSchema);