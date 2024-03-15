const app = require('./api');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const port = 3001;

app.use(bodyParser.json());

// Define a custom cors middleware configuration
const customCorsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply the custom cors middleware configuration
app.use(cors(customCorsOptions));

// Add a route to handle preflight OPTIONS requests
app.options('*', cors(customCorsOptions));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});