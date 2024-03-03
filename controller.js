const { pool } = require("./db");

const getAllCustomers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = "created_at",
      sortOrder = "DESC",
      search,
    } = req.query;
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM customers";
    let countQuery = "SELECT COUNT(*) FROM customers";

    if (search) {
      query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
      countQuery += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

    const result = await pool.query(query);
    const countResult = await pool.query(countQuery);
    const totalCount = countResult.rows[0].count;

    res.json({ data: result.rows, totalCount });
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllCustomers };
