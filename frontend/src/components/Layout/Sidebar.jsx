import { Link, useLocation } from "react-router-dom"
import { Home, Users, UserCircle2, ClipboardList, Truck, Package, BookCheck, Link2, FileText, Bell } from "lucide-react"

const itens = [
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
    <aside className="w-56 bg-muted p-4">
      <h2 className="text-xl font-semibold mb-6">Painel</h2>
      {itens.map(item => {
        const active = pathname === item.to
        return (
          <Link key={item.to} to={item.to}
            className={`flex items-center gap-2 px-3 py-2 mb-1 rounded-md transition ${
              active ? "bg-primary text-white" : "text-foreground hover:bg-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </aside>
  )
}
