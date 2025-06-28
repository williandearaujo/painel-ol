// [1] Importações principais
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { analystService } from "@/services/analystService"

export default function Analysts() {
  // [2] Estados principais
  const [analysts, setAnalysts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [showInactive, setShowInactive] = useState(false)
  const [newAnalyst, setNewAnalyst] = useState({ name: "", email: "", role: "", notes: "", active: true })
  const [selected, setSelected] = useState(null)

  // [3] Carrega analistas da API
  const load = async () => {
    const data = await analystService.getAll()
    setAnalysts(data)
    setFiltered(data)
  }

  useEffect(() => { load() }, [])

  // [4] Filtragem por nome e status
  useEffect(() => {
    const filtro = analysts.filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) &&
      (showInactive || a.active)
    )
    setFiltered(filtro)
  }, [search, analysts, showInactive])

  // [5] Submete novo ou edição
  const save = async () => {
    if (selected) {
      await analystService.update(selected.id, newAnalyst)
    } else {
      await analystService.create(newAnalyst)
    }
    setNewAnalyst({ name: "", email: "", role: "", notes: "", active: true })
    setSelected(null)
    load()
  }

  // [6] Deletar analista
  const remove = async (id) => {
    await analystService.remove(id)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Analistas</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Analista</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selected ? "Editar Analista" : "Novo Analista"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input value={newAnalyst.name} onChange={e => setNewAnalyst({ ...newAnalyst, name: e.target.value })} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={newAnalyst.email} onChange={e => setNewAnalyst({ ...newAnalyst, email: e.target.value })} />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input value={newAnalyst.role} onChange={e => setNewAnalyst({ ...newAnalyst, role: e.target.value })} />
              </div>
              <div>
                <Label>Observações</Label>
                <Textarea value={newAnalyst.notes} onChange={e => setNewAnalyst({ ...newAnalyst, notes: e.target.value })} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={newAnalyst.active} onCheckedChange={val => setNewAnalyst({ ...newAnalyst, active: val })} />
                <Label>Ativo</Label>
              </div>
              <Button onClick={save}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <Input placeholder="Buscar por nome..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        <div className="flex items-center space-x-2">
          <Switch checked={showInactive} onCheckedChange={setShowInactive} />
          <Label>Mostrar inativos</Label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Cargo</th>
              <th className="text-left p-2">Ativo</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.role}</td>
                <td className="p-2">{a.active ? "Sim" : "Não"}</td>
                <td className="p-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelected(a)
                    setNewAnalyst(a)
                  }}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => remove(a.id)}>Deletar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
