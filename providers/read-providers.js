const mysql = require("mysql2/promise");

module.exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "gapsi",
  });
  let data = [];

  try {
    const [rows] = await connection.execute("SELECT * FROM providers");
    data = rows;
  } catch (error) {
    console.error("ERROR", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  } finally {
    await connection.end();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
