import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { equipmentService } from "@/services/equipmentService"

export default function Equipments() {
  const [equipment, setEquipment] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [showInactive, setShowInactive] = useState(false)
  const [newItem, setNewItem] = useState({
    client: "",
    host: "",
    type: "",
    description: "",
    observation: "",
    access_url: "",
    status: true
  })
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const data = await equipmentService.getAll()
    setEquipment(data)
    setFiltered(data)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const filtro = equipment.filter(e =>
      e.client.toLowerCase().includes(search.toLowerCase()) &&
      (showInactive || e.status)
    )
    setFiltered(filtro)
  }, [search, equipment, showInactive])

  const save = async () => {
    if (selected) {
      await equipmentService.update(selected.id, newItem)
    } else {
      await equipmentService.create(newItem)
    }
    setNewItem({ client: "", host: "", type: "", description: "", observation: "", access_url: "", status: true })
    setSelected(null)
    load()
  }

  const remove = async (id) => {
    await equipmentService.remove(id)
    load()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Equipamentos</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Equipamento</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selected ? "Editar Equipamento" : "Novo Equipamento"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Cliente</Label>
                <Input value={newItem.client} onChange={e => setNewItem({ ...newItem, client: e.target.value })} />
              </div>
              <div>
                <Label>Host</Label>
                <Input value={newItem.host} onChange={e => setNewItem({ ...newItem, host: e.target.value })} />
              </div>
              <div>
                <Label>Tipo</Label>
                <Input value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })} />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
              </div>
              <div>
                <Label>Observação</Label>
                <Textarea value={newItem.observation} onChange={e => setNewItem({ ...newItem, observation: e.target.value })} />
              </div>
              <div>
                <Label>URL de Acesso</Label>
                <Input value={newItem.access_url} onChange={e => setNewItem({ ...newItem, access_url: e.target.value })} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={newItem.status} onCheckedChange={val => setNewItem({ ...newItem, status: val })} />
                <Label>Ativo</Label>
              </div>
              <Button onClick={save}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <Input placeholder="Buscar por cliente..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        <div className="flex items-center space-x-2">
          <Switch checked={showInactive} onCheckedChange={setShowInactive} />
          <Label>Mostrar inativos</Label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Cliente</th>
              <th className="text-left p-2">Host</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Ativo</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b hover:bg-muted">
                <td className="p-2">{e.client}</td>
                <td className="p-2">{e.host}</td>
                <td className="p-2">{e.type}</td>
                <td className="p-2">{e.status ? "Sim" : "Não"}</td>
                <td className="p-2 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelected(e)
                    setNewItem(e)
                  }}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => remove(e.id)}>Deletar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
