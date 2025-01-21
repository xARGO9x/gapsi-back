const mysql = require("mysql2/promise");

const connectDB = () =>
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "gapsi",
  });

module.exports = {
  connectDB,
};
