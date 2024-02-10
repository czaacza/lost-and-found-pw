const db = require('./db/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();
