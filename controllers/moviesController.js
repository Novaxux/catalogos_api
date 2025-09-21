import pool from "../db.js";

export async function getAllMovies(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM movies ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getMovieById(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Movie not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createMovie(req, res, next) {
  try {
    const { title, genre, release_year, image_url } = req.body;
    const [result] = await pool.query(
      "INSERT INTO movies (title, genre, release_year, image_url) VALUES (?, ?, ?, ?)",
      [title, genre, release_year || null, image_url || null]
    );
    const insertedId = result.insertId;
    const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [
      insertedId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateMovie(req, res, next) {
  try {
    const id = req.params.id;
    const fields = [];
    const values = [];

    const allowed = ["title", "genre", "release_year", "image_url"];
    for (const key of allowed) {
      if (key in req.body) {
        fields.push(`${key} = ?`);
        values.push(req.body[key]);
      }
    }

    if (fields.length === 0)
      return res.status(400).json({ message: "No fields to update" });

    values.push(id);
    const sql = `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`;
    await pool.query(sql, values);
    const [rows] = await pool.query("SELECT * FROM movies WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM movies WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    next(err);
  }
}
