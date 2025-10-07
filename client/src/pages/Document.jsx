import React from "react";

function DocPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen rounded-2xl">
      {/* หัวข้อหลัก */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ENGSE219: Term-Project
      </h1>

      {/* โครงสร้างโปรเจกต์ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">
          🧩 Project Structure
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 leading-relaxed">
          <p className="font-medium text-gray-700 mb-2">📂 Frontend</p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>React + Vite + TailwindCSS</li>
            <li>Component-based design (Navbar, TableList)</li>
            <li>Fetch data from Express API (CRUD operation)</li>
            <li>
              Pages: <code>PlayerPage</code>, <code>CharacterPage</code>,{" "}
              <code>SkillPage</code>, <code>ItemPage</code>,{" "}
              <code>DocPage</code>
            </li>
          </ul>

          <p className="font-medium text-gray-700 mb-2">🖥️ Backend</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Node.js + Express.js</li>
            <li>Database: MySQL</li>
            <li>
              Routes: <code>playerRoutes.js</code>,{" "}
              <code>characterRoutes.js</code>, <code>skillRoutes.js</code>,{" "}
              <code>itemRoutes.js</code>
            </li>
            <li>Supports RESTful API for CRUD operations</li>
          </ul>
        </div>
      </section>

      {/* ผู้จัดทำ */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-3">
          👨‍💻 ผู้จัดทำ
        </h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <ul className="list-none text-gray-700">
            <li>
              <b>ชื่อ:</b> นายธนภัทร นุกูล
            </li>
            <li>
              <b>รหัสนักศึกษา:</b> 67543210031-0
            </li>
            <li>
              <b>สาขา:</b> วิศวกรรมซอฟต์แวร์
            </li>
            <li>
              <b>มหาวิทยาลัย:</b> มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-3">
          <ul className="list-none text-gray-700">
            <li>
              <b>ชื่อ:</b> นางสาวสุพิชญา ชื่นจุม
            </li>
            <li>
              <b>รหัสนักศึกษา:</b> 67543210074-0
            </li>
            <li>
              <b>สาขา:</b> วิศวกรรมซอฟต์แวร์
            </li>
            <li>
              <b>มหาวิทยาลัย:</b> มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default DocPage;
