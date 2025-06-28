// frontend/src/components/layout/PrivateLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function PrivateLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
