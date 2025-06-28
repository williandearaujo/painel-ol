// src/components/layout/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="p-4 bg-white border-t text-center text-sm">
      © {new Date().getFullYear()} OL Tecnologia. Todos os direitos reservados.
    </footer>
  );
}
