// frontend/src/components/layout/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
