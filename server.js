import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use("/", express.static(path.join(process.cwd(), "/public")));

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(process.cwd(), "/View/404.html"));
});

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});