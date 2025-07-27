# Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques

## Overview

This project demonstrates the fundamentals of MongoDB including installation, creating collections, performing CRUD operations, aggregation pipelines, and indexing for performance optimization.

## Project Structure

- `insert_books.js` — Script to insert sample book documents into the database.
- `queries.js` — Contains MongoDB queries for CRUD operations, advanced queries, and aggregation pipelines.
- mongodb(screenshots)— Visual evidence of MongoDB Compass or Atlas showing the collections and sample data.

## Setup Instructions

1. **Install MongoDB:**

   - Option A: Install MongoDB Community Edition locally from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
   - Option B: Set up a free MongoDB Atlas cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Database and Collection:**

   - Create a database named `plp_bookstore`.
   - Create a collection named `books`.

3. **Populate the Database:**

   - Run the script `insert_books.js` to insert sample book documents into the `books` collection.

   ```bash
   node insert_books.js

