
// queries.js

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    // Task 2: Basic CRUD Operations

    // Find all books in a specific genre (e.g. "Dystopian")
    const dystopianBooks = await books.find({ genre: 'Dystopian' }).toArray();
    console.log('Dystopian Books:', dystopianBooks);

    // Find books published after 2000
    const booksAfter2000 = await books.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('Books published after 2000:', booksAfter2000);

    // Find books by a specific author (e.g. "J.K. Rowling")
    const rowlingBooks = await books.find({ author: 'J.K. Rowling' }).toArray();
    console.log('Books by J.K. Rowling:', rowlingBooks);

    // Update the price of a specific book (e.g. "The Hobbit" to 16.99)
    const updateResult = await books.updateOne(
      { title: 'The Hobbit' },
      { $set: { price: 16.99 } }
    );
    console.log('Updated price of The Hobbit:', updateResult.modifiedCount);

    // Delete a book by its title (e.g. "The Catcher in the Rye")
    const deleteResult = await books.deleteOne({ title: 'The Catcher in the Rye' });
    console.log('Deleted The Catcher in the Rye:', deleteResult.deletedCount);

    // Task 3: Advanced Queries

    // Find books that are both in stock and published after 2010
    const recentInStock = await books
      .find({ in_stock: true, published_year: { $gt: 2010 } })
      .toArray();
    console.log('Books in stock and published after 2010:', recentInStock);

    // Use projection to return only title, author, price
    const projectionExample = await books
      .find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } })
      .toArray();
    console.log('Projection (title, author, price):', projectionExample);

    // Sorting by price ascending
    const sortedAsc = await books.find().sort({ price: 1 }).toArray();
    console.log('Books sorted by price ascending:', sortedAsc);

    // Sorting by price descending
    const sortedDesc = await books.find().sort({ price: -1 }).toArray();
    console.log('Books sorted by price descending:', sortedDesc);

    // Pagination: 5 books per page, page 2 (skip first 5)
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log('Page 2 (5 books per page):', page2);

    // Task 4: Aggregation Pipeline

    // Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: '$genre', averagePrice: { $avg: '$price' } } },
    ]).toArray();
    console.log('Average price by genre:', avgPriceByGenre);

    // Author with most books
    const authorMostBooks = await books.aggregate([
      { $group: { _id: '$author', bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 },
    ]).toArray();
    console.log('Author with most books:', authorMostBooks);

    // Group books by publication decade and count them
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: {
            $concat: [
              { $toString: { $multiply: [{ $floor: { $divide: ['$published_year', 10] } }, 10] } },
              's',
            ],
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray();
    console.log('Books grouped by decade:', booksByDecade);

    // Task 5: Indexing

    // Create index on title
    await books.createIndex({ title: 1 });
    console.log('Created index on title');

    // Create compound index on author and published_year
    await books.createIndex({ author: 1, published_year: 1 });
    console.log('Created compound index on author and published_year');

// Use explain() to demonstrate index usage for a query
    const explainResult = await books.find({ title: '1984' }).explain('executionStats');
    console.log('Explain for find by title:', JSON.stringify(explainResult, null, 2));

  } catch (err) {
    console.error('Error running queries:', err);
  } finally {
    await client.close();
  }
}

runQueries();