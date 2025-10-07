import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `
    SELECT c.char_id, c.char_name, c.level, c.fame_points, c.is_active,
           p.username AS owner
    FROM character_tb c
    JOIN Player p ON c.player_id = p.player_id
    ORDER BY c.char_id ASC;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT c.*, p.username 
    FROM character_tb c 
    JOIN Player p ON c.player_id = p.player_id
    WHERE c.char_id = ?;
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Character not found" });
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { player_id, char_name, fame_points, level, is_active } = req.body;

  if (!player_id || !char_name)
    return res
      .status(400)
      .json({ message: "player_id และ char_name จำเป็นต้องมี" });

  const sql = `
    INSERT INTO character_tb (player_id, char_name, fame_points, level, is_active)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [player_id, char_name, fame_points || 0, level || 1, is_active ?? true],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ เพิ่มตัวละครสำเร็จ", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { char_name, fame_points, level, is_active } = req.body;

  const sql = `
    UPDATE character_tb 
    SET char_name = ?, fame_points = ?, level = ?, is_active = ?
    WHERE char_id = ?
  `;
  db.query(
    sql,
    [char_name, fame_points, level, is_active, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ อัปเดตตัวละครเรียบร้อย" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM character_tb WHERE char_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ ลบตัวละครเรียบร้อย" });
  });
});

export default router;
