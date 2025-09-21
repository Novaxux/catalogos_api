import pool from "../db.js";

export async function getAllBooks(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM books ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ message: "Book not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, author, genre, publication_year, cover_url } = req.body;
    const [result] = await pool.query(
      "INSERT INTO books (title, author, genre, publication_year, cover_url) VALUES (?, ?, ?, ?, ?)",
      [
        title,
        author || null,
        genre || null,
        publication_year || null,
        cover_url || null,
      ]
    );
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const id = req.params.id;
    const fields = [];
    const values = [];
    const allowed = [
      "title",
      "author",
      "genre",
      "publication_year",
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
      `UPDATE books SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
}
