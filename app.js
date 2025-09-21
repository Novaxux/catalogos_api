import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import moviesRouter from "./routes/movies.js";
import songsRouter from "./routes/songs.js";
import booksRouter from "./routes/books.js";
import placesRouter from "./routes/places.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Catalog API - movies, songs, books, places" });
});

app.use("/api/movies", moviesRouter);
app.use("/api/songs", songsRouter);
app.use("/api/books", booksRouter);
app.use("/api/places", placesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
