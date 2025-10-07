import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM Item ORDER BY item_id ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Item WHERE item_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json(results[0]);
  });
});

router.post("/", (req, res) => {
  const { item_name, tier, quality, enchant_level, req_fame, durability } =
    req.body;

  if (!item_name)
    return res.status(400).json({ message: "กรุณาใส่ชื่อไอเท็ม" });

  const sql = `
    INSERT INTO Item (item_name, tier, quality, enchant_level, req_fame, durability)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      item_name,
      tier,
      quality,
      enchant_level || 0,
      req_fame || 0,
      durability || 100,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ เพิ่ม Item สำเร็จ", id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, tier, quality, enchant_level, req_fame, durability } =
    req.body;

  const sql = `
    UPDATE Item
    SET item_name = ?, tier = ?, quality = ?, enchant_level = ?, req_fame = ?, durability = ?
    WHERE item_id = ?
  `;
  db.query(
    sql,
    [item_name, tier, quality, enchant_level, req_fame, durability, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "📝 อัปเดต Item เรียบร้อย" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Item WHERE item_id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ ลบ Item เรียบร้อย" });
  });
});

export default router;
