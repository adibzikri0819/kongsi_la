// api.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

// Create a new SQLite database
const db = new sqlite3.Database('mydatabase.db');

app.use(bodyParser.json());

// Get all products with filtering and sorting
app.get('/api/inventory', (req, res) => {
  let sql = 'SELECT * FROM products';
  const { category, sort } = req.query;

  // Add filtering
  if (category) {
    sql += ` WHERE category = '${category}'`;
  }

  // Add sorting
  if (sort === 'price') {
    sql += ' ORDER BY price';
  }

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Get a specific product by id
app.get('/api/inventory/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    if (!row) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(row);
  });
});

// Add a new product
app.post('/api/add-inventory', (req, res) => {
  const newProduct = req.body;
  db.run(
    'INSERT INTO products (name, price, quantity, supplier_id) VALUES (?, ?, ?, ?)',
    [newProduct.name, newProduct.price, newProduct.quantity, newProduct.supplier_id],
    function (err) {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      newProduct.id = this.lastID;
      res.status(201).json(newProduct);
    }
  );
});

// Update a product by id
app.put('/api/update-inventory/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  db.run(
    'UPDATE products SET name = ?, price = ?, quantity = ?, supplier_id = ? WHERE id = ?',
    [updatedProduct.name, updatedProduct.price, updatedProduct.quantity, updatedProduct.supplier_id, productId],
    function (err) {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json(updatedProduct);
    }
  );
});

// Delete a product by id
app.delete('/api/delete-inventory/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  db.run('DELETE FROM products WHERE id = ?', [productId], function (err) {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.sendStatus(204);
  });
});

module.exports = app;
