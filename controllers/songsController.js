import pool from "../db.js";

export async function getAllSongs(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM songs ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getSongById(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM songs WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Song not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createSong(req, res, next) {
  try {
    const { title, artist, genre, duration_seconds, cover_url } = req.body;
    const [result] = await pool.query(
      "INSERT INTO songs (title, artist, genre, duration_seconds, cover_url) VALUES (?, ?, ?, ?, ?)",
      [
        title,
        artist || null,
        genre || null,
        duration_seconds || null,
        cover_url || null,
      ]
    );
    const [rows] = await pool.query("SELECT * FROM songs WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateSong(req, res, next) {
  try {
    const id = req.params.id;
    const fields = [];
    const values = [];
    const allowed = [
      "title",
      "artist",
      "genre",
      "duration_seconds",
      "cover_url",
    ];
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
      `UPDATE songs SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    const [rows] = await pool.query("SELECT * FROM songs WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteSong(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM songs WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err) {
    next(err);
  }
}
