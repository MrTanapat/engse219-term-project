import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all items
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Item ORDER BY item_id ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ SQL Select Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET single item by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Item WHERE item_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ SQL Select Error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json(results[0]);
  });
});

// POST - Create new item
router.post("/", (req, res) => {
  const { item_name, tier, quality, req_level, durability, is_bound } =
    req.body;

  // Validation
  if (!item_name || !tier || !quality) {
    return res.status(400).json({
      message: "⚠️ กรุณากรอกชื่อไอเท็ม, Tier และ Quality",
    });
  }

  const sql = `
    INSERT INTO Item (item_name, tier, quality, req_level, durability, is_bound)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    item_name,
    tier,
    quality,
    req_level || 1,
    durability || 100,
    is_bound || 0,
  ];

  console.log("📝 Inserting:", values); // Debug log

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ SQL Insert Error:", err);
      return res.status(500).json({
        error: err.message,
        sqlMessage: err.sqlMessage,
      });
    }
    res.json({
      message: "✅ เพิ่ม Item สำเร็จ",
      id: result.insertId,
    });
  });
});

// PUT - Update existing item
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, tier, quality, req_level, durability, is_bound } =
    req.body;

  const sql = `
    UPDATE Item
    SET item_name = ?, tier = ?, quality = ?, req_level = ?, durability = ?, is_bound = ?
    WHERE item_id = ?
  `;

  const values = [
    item_name,
    tier,
    quality,
    req_level,
    durability,
    is_bound,
    id,
  ];

  console.log("📝 Updating:", values); // Debug log

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ SQL Update Error:", err);
      return res.status(500).json({
        error: err.message,
        sqlMessage: err.sqlMessage,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "📝 อัปเดต Item เรียบร้อย" });
  });
});

// DELETE - Remove item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Item WHERE item_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ SQL Delete Error:", err);
      return res.status(500).json({
        error: err.message,
        sqlMessage: err.sqlMessage,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "🗑️ ลบ Item เรียบร้อย" });
  });
});

export default router;
