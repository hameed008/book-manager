
import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", checkAuth, getBooks);
router.get('/:id', checkAuth, getBookById);
router.post("/", checkAuth, createBook)
router.patch('/:id', checkAuth, updateBook);
router.delete('/:id', checkAuth, deleteBook);
export default router;
