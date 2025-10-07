import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Skill ORDER BY skill_id ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Skill WHERE skill_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Skill not found" });
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { skill_name, required_fame } = req.body;
  if (!skill_name) return res.status(400).json({ message: "กรุณาใส่ชื่อสกิล" });

  const sql = "INSERT INTO Skill (skill_name, required_fame) VALUES (?, ?)";
  db.query(sql, [skill_name, required_fame || 0], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ เพิ่ม Skill สำเร็จ", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { skill_name, required_fame } = req.body;

  const sql =
    "UPDATE Skill SET skill_name = ?, required_fame = ? WHERE skill_id = ?";
  db.query(sql, [skill_name, required_fame, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "📝 อัปเดต Skill เรียบร้อย" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Skill WHERE skill_id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ ลบ Skill เรียบร้อย" });
  });
});

export default router;
