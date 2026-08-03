import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {

    const query = { userId: req.user._id };

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.tag && req.query.tag.trim() !== '') {
      const tagRegex = new RegExp(req.query.tag.trim(), 'i');
      query.tags = { $in: [tagRegex] };
    }

    let sortOption = { createdAt: -1 };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBooks = await Book.countDocuments(query);

    const stats = {
      total: totalBooks,
      wantToRead: await Book.countDocuments({ ...query, status: 'Want to Read' }),
      reading: await Book.countDocuments({ ...query, status: 'Reading' }),
      completed: await Book.countDocuments({ ...query, status: 'Completed' }),
    };

    res.status(200).json({
      books,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalItems: totalBooks,
        itemsPerPage: limit,
      },
      stats,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      message: 'Server error while fetching books',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    const newBook = await Book.create({
      userId: req.user._id,
      title,
      author,
      tags,
      status: status || 'Want to Read'
    });

    res.status(201).json({ message: "Book Added Successfully" });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(400).json({ message: 'Failed to add book. Please check your inputs.' });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true, runValidators: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ message: 'Failed to update book details' });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
};