const { connectDB } = require("./db-helper");

module.exports.handler = async (event) => {
  const connection = await connectDB();
  const [rows] = await connection.execute("SELECT * FROM users");

  return {
    statusCode: 200,
    body: JSON.stringify(rows),
  };
};
