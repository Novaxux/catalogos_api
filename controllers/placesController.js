import pool from "../db.js";

export async function getAllPlaces(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM places ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getPlaceById(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM places WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ message: "Place not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createPlace(req, res, next) {
  try {
    const { name, description, visit_date, image_url } = req.body;
    const [result] = await pool.query(
      "INSERT INTO places (name, description, visit_date, image_url) VALUES (?, ?, ?, ?)",
      [name, description || null, visit_date || null, image_url || null]
    );
    const [rows] = await pool.query("SELECT * FROM places WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updatePlace(req, res, next) {
  try {
    const id = req.params.id;
    const fields = [];
    const values = [];
    const allowed = ["name", "description", "visit_date", "image_url"];
    for (const key of allowed) {
      if (key in req.body) {
        fields.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }
    if (!fields.length)
      return res.status(400).json({ message: "No fields to update" });
    values.push(id);
    await pool.query(
      `UPDATE places SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    const [rows] = await pool.query("SELECT * FROM places WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deletePlace(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM places WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Place not found" });
    res.json({ message: "Place deleted" });
  } catch (err) {
    next(err);
  }
}
