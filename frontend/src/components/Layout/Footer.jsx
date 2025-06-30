
import React from "react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="flex items-center space-x-4">
        <span>© {new Date().getFullYear()} OL Tecnologia</span>
        <span className="text-gray-400">•</span>
        <span>Todos os direitos reservados</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-400">Versão 1.0.0</span>
      </div>
    </footer>
  );
}
