import { createContext, useContext, useState, useEffect } from "react"
import { authService, getToken } from "@/services/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loadUser = async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      return
    }

    try {
      const data = await authService.me()
      setUser(data)
    } catch (error) {
      console.error("Erro ao carregar usuário:", error)
      setUser(null)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
