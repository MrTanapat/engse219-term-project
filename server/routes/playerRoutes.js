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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "⚠️ กรุณากรอก Username และ Email" });
  }

  let sql, params;
  if (password) {
    sql = `
      UPDATE Player
      SET username = ?, email = ?, password = ?
      WHERE player_id = ?
    `;
    params = [username, email, password, id];
  } else {
    sql = `
      UPDATE Player
      SET username = ?, email = ?
      WHERE player_id = ?
    `;
    params = [username, email, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "❌ Player not found" });
    res.json({ message: "📝 อัปเดตข้อมูลผู้เล่นเรียบร้อย" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Player WHERE player_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "❌ Player not found" });
    res.json({ message: "🗑️ ลบ Player เรียบร้อย" });
  });
});

export default router;
