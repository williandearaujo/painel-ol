<<<<<<< HEAD
export default function Footer() {
  return (
    <footer className="border-t px-6 py-2 text-xs text-muted-foreground text-center bg-background">
      © 2025 OL Tecnologia. Todos os direitos reservados.
=======

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/60 py-6">
      <div className="px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-sm text-slate-600">
            © 2024 OL Tecnologia. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <span>Versão 1.0.0</span>
            <span>•</span>
            <span>Desenvolvido com ❤️</span>
          </div>
        </div>
      </div>
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
    </footer>
  )
}
