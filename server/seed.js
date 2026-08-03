import Book from "./models/Book.js";

const seedData = [
  {
    "title": "The Pragmatic Programmer",
    "author": "David Thomas, Andrew Hunt",
    "tags": ["Programming", "Career", "Technology"],
    "status": "Completed"
  },
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "tags": ["Software Engineering", "Best Practices"],
    "status": "Want to Read"
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "tags": ["Science Fiction", "Classic"],
    "status": "Reading"
  },
  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "tags": ["Self-Help", "Productivity"],
    "status": "Completed"
  },
  {
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "tags": ["Science Fiction", "Thriller"],
    "status": "Want to Read"
  },
  {
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "tags": ["Fiction", "Fantasy"],
    "status": "Completed"
  },
  {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "tags": ["Psychology", "Non-fiction"],
    "status": "Reading"
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "tags": ["Dystopian", "Classic", "Political Fiction"],
    "status": "Completed"
  }
]
export const seedDatabase = async (req) => {
  try {
    // Check if courses already exist
    const existingBooks = await Book.find();
    console.log(existingBooks);
    if (existingBooks.length === 0) {
      await Book.insertMany(seedData);
      console.log("Database seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
