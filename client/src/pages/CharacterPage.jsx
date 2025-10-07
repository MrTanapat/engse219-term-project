import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";

function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState({
    player_id: "",
    char_name: "",
    fame_points: 0,
    level: 1,
    is_active: true,
  });

  const [editing, setEditing] = useState(null);

  // โหลดข้อมูลตัวละครทั้งหมด
  const fetchCharacters = async () => {
    const res = await fetch("http://localhost:5000/api/characters");
    const data = await res.json();
    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // เพิ่มตัวละครใหม่
  const handleAdd = async () => {
    await fetch("http://localhost:5000/api/characters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ เพิ่มตัวละครสำเร็จ");
    resetForm();
    fetchCharacters();
  };

  // ลบตัวละคร
  const handleDelete = async (row) => {
    if (!window.confirm("ลบตัวละครนี้แน่ใจไหม?")) return;
    await fetch(`http://localhost:5000/api/characters/${row.char_id}`, {
      method: "DELETE",
    });
    fetchCharacters();
  };

  // เริ่มแก้ไข
  const handleEdit = (char) => {
    setEditing(char.char_id);
    setForm({
      player_id: char.player_id,
      char_name: char.char_name,
      fame_points: char.fame_points,
      level: char.level,
      is_active: char.is_active ? true : false,
    });
  };

  // บันทึกหลังแก้ไข
  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/characters/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("📝 อัปเดตข้อมูลเรียบร้อย");
    setEditing(null);
    resetForm();
    fetchCharacters();
  };

  const resetForm = () => {
    setForm({
      player_id: "",
      char_name: "",
      fame_points: 0,
      level: 1,
      is_active: true,
    });
  };

  // แปลงข้อมูลสำหรับ TableList
  const tableData = characters.map((c) => ({
    char_id: c.char_id,
    char_name: c.char_name,
    owner: c.owner,
    level: c.level,
    fame_points: c.fame_points,
    is_active: c.is_active ? "Active" : "Non_Active",
    player_id: c.player_id,
  }));

  const columns = [
    "char_id",
    "char_name",
    "owner",
    "level",
    "fame_points",
    "is_active",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          ⚔️ Character Management
        </h2>
        <p className="text-gray-600 mt-1">
          จัดการข้อมูลตัวละครในเกม Albion Online
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editing ? "📝 แก้ไขตัวละคร" : "➕ เพิ่มตัวละครใหม่"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player ID
            </label>
            <input
              type="text"
              placeholder="Enter Player ID"
              value={form.player_id}
              onChange={(e) => setForm({ ...form, player_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Character Name
            </label>
            <input
              type="text"
              placeholder="Enter Character Name"
              value={form.char_name}
              onChange={(e) => setForm({ ...form, char_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fame Points
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.fame_points}
              onChange={(e) =>
                setForm({ ...form, fame_points: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <input
              type="number"
              placeholder="1"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active Character
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              ➕ Add Character
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <TableList
        columns={columns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CharacterPage;
