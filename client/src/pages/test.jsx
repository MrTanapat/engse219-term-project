import React, { useEffect, useState } from "react";
import TableList from "./components/TableList";

function SkillPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ skill_name: "", required_fame: 0 });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async () => {
    if (!form.skill_name.trim() || form.required_fame <= 0) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    await fetch("http://localhost:5000/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ เพิ่ม Skill สำเร็จ");
    setForm({ skill_name: "", required_fame: 0 });
    fetchSkills();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("แน่ใจว่าต้องการลบ Skill นี้?")) return;
    await fetch(`http://localhost:5000/api/skills/${id}`, { method: "DELETE" });
    fetchSkills();
  };

  const handleEdit = (s) => {
    setEditing(s.skill_id);
    setForm({ skill_name: s.skill_name, required_fame: s.required_fame });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/skills/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("📝 อัปเดต Skill เรียบร้อย");
    setEditing(null);
    setForm({ skill_name: "", required_fame: 0 });
    fetchSkills();
  };

  const resetForm = () => setForm({ skill_name: "", required_fame: 0 });
  const columns = ["skill_id", "skill_name", "required_fame"];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-3xl font-bold text-gray-800 flex items-center gap-2">
          🌟 Skills Management
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">
          {editing ? "📝 แก้ไขสกิล" : "➕ เพิ่มสกิลใหม่"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="e.g., Soldier Helmet"
              value={form.skill_name}
              onChange={(e) => setForm({ ...form, skill_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Fame
            </label>
            <input
              type="number"
              placeholder="e.g., 100"
              value={form.required_fame}
              onChange={(e) =>
                setForm({ ...form, required_fame: Number(e.target.value) })
              }
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
              ➕ Add Skill
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        {loading ? (
          <p className="text-gray-500 text-center">⏳ กำลังโหลดข้อมูล...</p>
        ) : (
          <TableList
            data={skills}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default SkillPage;
