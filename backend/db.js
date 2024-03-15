const sqlite3 = require('sqlite3').verbose();

// Open a new SQLite database in memory
const db = new sqlite3.Database('mydatabase.db');

// Create a products table
db.serialize(() => {
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    quantity INTEGER,
    supplier_id INTEGER
  )`);

  // Create a suppliers table
  db.run(`CREATE TABLE suppliers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    contact_person TEXT,
    email TEXT,
    phone TEXT
  )`);

  // Insert sample data into the tables
  db.run(`INSERT INTO suppliers (name, contact_person, email, phone) VALUES
    ('Supplier 1', 'John Doe', 'supplier1@example.com', '123-456-7890')`);

  db.run(`INSERT INTO products (name, price, quantity, supplier_id) VALUES
    ('Product A', 10.99, 100, 1),
    ('Product B', 15.99, 50, 1)`);
});

// Export the database object for use in other modules
module.exports = db;