import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";

function ItemPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    item_name: "",
    tier: "",
    quality: "",
    req_level: 1,
    durability: 100,
    is_bound: 0,
  });
  const [editing, setEditing] = useState(null);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Server Error:", data);
        alert(
          `❌ Error: ${data.error || data.message || "Unknown error"}\n\nSQL: ${
            data.sqlMessage || ""
          }`
        );
        return;
      }

      alert("✅ เพิ่ม Item สำเร็จ");
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert(`❌ Network Error: ${error.message}`);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm("แน่ใจว่าต้องการลบ Item นี้?")) return;
    await fetch(`http://localhost:5000/api/items/${row.item_id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditing(item.item_id);
    setForm({
      item_name: item.item_name,
      tier: item.tier,
      quality: item.quality,
      req_level: item.req_level || 1,
      durability: item.durability,
      is_bound: item.is_bound || 0,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${editing}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Server Error:", data);
        alert(`❌ Error: ${data.error || data.message || "Unknown error"}`);
        return;
      }

      alert("📝 อัปเดต Item เรียบร้อย");
      setEditing(null);
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert(`❌ Network Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setForm({
      item_name: "",
      tier: "",
      quality: "",
      req_level: 1,
      durability: 100,
      is_bound: 0,
    });
  };

  const tableData = items.map((i) => ({
    item_id: i.item_id,
    item_name: i.item_name,
    tier: `T${i.tier}`,
    quality: i.quality,
    req_level: i.req_level || 1,
    durability: `${i.durability}%`,
    is_bound: i.is_bound ? "✅ Yes" : "❌ No",
  }));

  const columns = [
    "item_id",
    "item_name",
    "tier",
    "quality",
    "req_level",
    "durability",
    "is_bound",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="font-heading text-3xl font-bold text-gray-800 flex items-center gap-2">
          🛡️ Item Management
        </h2>
        <p className="text-gray-600 mt-1">
          จัดการข้อมูลไอเทมและอุปกรณ์ใน Albion Online
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">
          {editing ? "📝 แก้ไขไอเทม" : "➕ เพิ่มไอเทมใหม่"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              placeholder="e.g., Soldier Helmet"
              value={form.item_name}
              onChange={(e) => setForm({ ...form, item_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier
            </label>
            <select
              value={form.tier}
              onChange={(e) =>
                setForm({ ...form, tier: parseInt(e.target.value) || "" })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Tier</option>
              <option value="1">T1</option>
              <option value="2">T2</option>
              <option value="3">T3</option>
              <option value="4">T4</option>
              <option value="5">T5</option>
              <option value="6">T6</option>
              <option value="7">T7</option>
              <option value="8">T8</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quality
            </label>
            <select
              value={form.quality}
              onChange={(e) => setForm({ ...form, quality: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Quality</option>
              <option value="Normal">Normal</option>
              <option value="Good">Good</option>
              <option value="Outstanding">Outstanding</option>
              <option value="Excellent">Excellent</option>
              <option value="Masterpiece">Masterpiece</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Level
            </label>
            <input
              type="number"
              min="1"
              max="100"
              placeholder="1"
              value={form.req_level}
              onChange={(e) =>
                setForm({ ...form, req_level: parseInt(e.target.value) || 1 })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durability (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="100"
              value={form.durability}
              onChange={(e) =>
                setForm({
                  ...form,
                  durability: parseInt(e.target.value) || 100,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is Bound?
            </label>
            <select
              value={form.is_bound}
              onChange={(e) =>
                setForm({ ...form, is_bound: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value={0}>❌ No (Tradeable)</option>
              <option value={1}>✅ Yes (Bound)</option>
            </select>
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
              ➕ Add Item
            </button>
          )}
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

export default ItemPage;
