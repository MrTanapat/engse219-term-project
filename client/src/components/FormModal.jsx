import React from "react";

function FormModal({
  open,
  title,
  fields,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            ❌ Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
