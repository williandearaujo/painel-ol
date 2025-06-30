import { Link, useLocation } from "react-router-dom"
import {
  Home, Users, ClipboardList, Truck, Package, Link2,
  BookCheck, FileText, UserCircle2, Bell
} from "lucide-react"

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/clients", icon: Users, label: "Clientes" },
  { to: "/analysts", icon: UserCircle2, label: "Analistas" },
  { to: "/tasks", icon: ClipboardList, label: "Tarefas" },
  { to: "/suppliers", icon: Truck, label: "Fornecedores" },
  { to: "/equipment", icon: Package, label: "Equipamentos" },
  { to: "/certifications", icon: BookCheck, label: "Certificações" },
  { to: "/links", icon: Link2, label: "Links" },
  { to: "/contacts", icon: FileText, label: "Contatos" },
  { to: "/reports", icon: Bell, label: "Relatórios" },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  return (
    <aside className="w-60 bg-muted p-4 border-r">
      <h2 className="text-lg font-bold mb-6">Painel</h2>
      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-all ${
              pathname === to
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
