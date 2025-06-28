// src/components/layout/Header.jsx
import React from "react";
import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-xl font-bold">OL Tecnologia</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-2 py-1 border rounded"
        />
        <Bell />
        <User className="cursor-pointer" />
      </div>
    </header>
  );
}
