const { connectDB } = require("../db-helper");

module.exports.handler = async (event) => {
  const connection = await connectDB();
  const { name, company_name, address } = event;
  let result = [];
  try {
    result = await connection.execute(
      `INSERT INTO providers (name, company_name, address) VALUES ('${name}', '${company_name}','${address}' )`
    );
  } catch (error) {
    console.error("ERROR", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal Server Error" }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: result[0].insertId,
      name,
      company_name,
      address,
    }),
  };
};
