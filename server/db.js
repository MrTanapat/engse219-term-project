import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "albion_online",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});
