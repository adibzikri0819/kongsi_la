const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3002;

// Create a new SQLite database
const db = new sqlite3.Database('mydatabase.db');

app.use(bodyParser.json());

// Management command to populate the database with 1000 rows
app.get('/api/populate-db', (req, res) => {
  // Generate 1000 products
  const products = [];
  for (let i = 1; i <= 1000; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.random() * 100, // Random price between 0 and 100
      quantity: Math.floor(Math.random() * 1000), // Random quantity between 0 and 1000
      supplier_id: Math.floor(Math.random() * 10) + 1, // Random supplier ID between 1 and 10
    });
  }

  // Insert products into the database
  db.serialize(() => {
    products.forEach(product => {
      db.run(
        'INSERT INTO products (name, price, quantity, supplier_id) VALUES (?, ?, ?, ?)',
        [product.name, product.price, product.quantity, product.supplier_id],
        err => {
          if (err) {
            console.error('Error inserting product:', err);
          }
        }
      );
    });
  });

  res.json({ message: 'Database populated with 1000 rows' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
