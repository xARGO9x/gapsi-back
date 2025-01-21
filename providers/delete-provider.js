const mysql = require("mysql2/promise");

module.exports.handler = async (event) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "gapsi",
  });

  const providerId = event.id;

  try {
    const [result] = await connection.execute(
      "DELETE FROM providers WHERE id = ?",
      [providerId]
    );

    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No se encontró el proveedor" }),
      };
    }
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
    body: JSON.stringify({ message: "Proveedor eliminado" }),
  };
};
