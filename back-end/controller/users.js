const db = require("../db");

exports.getusers = async (req, res) => {
  let query = 'SELECT * FROM users';
  let [rows,fields] = await db.query(query);
  let id = rows[0].id;
  res.json(rows);
}; 