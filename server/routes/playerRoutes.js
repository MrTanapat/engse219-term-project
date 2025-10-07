import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM Player", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  const sql =
    "INSERT INTO Player (username, email, password, created_at) VALUES (?, ?, ?, NOW())";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Player added", id: result.insertId });
  });
});

export default router;
