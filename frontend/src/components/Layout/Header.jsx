export default function Header() {
  return (
    <header className="border-b px-6 py-3 flex justify-between items-center bg-gradient-to-r from-rose-900 to-gray-800 text-white">
      <h1 className="text-lg font-bold">OL Tecnologia</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm">Olá, usuário!</span>
        <img src="https://ui-avatars.com/api/?name=User" className="w-8 h-8 rounded-full" alt="avatar" />
      </div>
    </header>
  )
}
