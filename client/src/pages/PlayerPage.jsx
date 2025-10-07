import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";

function PlayerPage() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editing, setEditing] = useState(null);

  const fetchPlayers = async () => {
    const res = await fetch("http://localhost:5000/api/players");
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAdd = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    await fetch("http://localhost:5000/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ เพิ่มผู้เล่นสำเร็จ");
    resetForm();
    fetchPlayers();
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`ต้องการลบผู้เล่น "${row.username}" ใช่หรือไม่?`))
      return;
    await fetch(`http://localhost:5000/api/players/${row.player_id}`, {
      method: "DELETE",
    });
    alert("🗑️ ลบผู้เล่นเรียบร้อย");
    fetchPlayers();
  };

  const handleEdit = (player) => {
    setEditing(player.player_id);
    setForm({
      username: player.username,
      email: player.email,
      password: "",
    });
  };

  const handleUpdate = async () => {
    if (!form.username || !form.email) {
      alert("⚠️ กรุณากรอก Username และ Email");
      return;
    }

    const updateData = {
      username: form.username,
      email: form.email,
    };

    if (form.password) {
      updateData.password = form.password;
    }

    await fetch(`http://localhost:5000/api/players/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    alert("📝 อัปเดตข้อมูลเรียบร้อย");
    setEditing(null);
    resetForm();
    fetchPlayers();
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
    });
  };

  const tableData = players.map((p) => ({
    player_id: p.player_id,
    username: p.username,
    email: p.email,
    created_at: new Date(p.created_at).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const columns = ["player_id", "username", "email", "created_at"];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-3xl font-bold text-gray-800 flex items-center gap-2">
          👥 Player Management
        </h2>
        <p className="text-gray-600 mt-1">
          จัดการบัญชีผู้เล่นและข้อมูลการลงทะเบียน
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">
          {editing ? "📝 แก้ไขข้อมูลผู้เล่น" : "➕ เพิ่มผู้เล่นใหม่"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="player@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password{" "}
              {editing ? (
                "(ไม่ต้องกรอกถ้าไม่เปลี่ยน)"
              ) : (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="password"
              placeholder={editing ? "••••••••" : "Enter password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                className="font-heading px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  resetForm();
                }}
                className="font-heading px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="font-heading px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              ➕ Add Player
            </button>
          )}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 หมายเหตุ:</span> ช่อง Username
            และ Email ต้องไม่ซ้ำกับผู้เล่นอื่น
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Players</p>
            <p className="font-heading text-4xl font-bold mt-1">
              {players.length}
            </p>
          </div>
        </div>
      </div>

      <TableList
        columns={columns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default PlayerPage;
