// src/services/authMock.js

const fakeUsers = [
  {
    id: 1,
    email: "admin@test.com",
    password: "123456",
    role: "admin",
    name: "Admin"
  },
  {
    id: 2,
    email: "user@test.com",
    password: "123456",
    role: "user",
    name: "Usuario"
  }
]

export const login = async (email, password) => {
  await new Promise((res) => setTimeout(res, 500))

  const user = fakeUsers.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) throw new Error("Credenciales incorrectas")

  const session = {
    token: "fake-token",
    user
  }

  localStorage.setItem("auth", JSON.stringify(session))
  return session
}

export const logout = () => {
  localStorage.removeItem("auth")
}

export const getCurrentUser = () => {
  const data = localStorage.getItem("auth")
  return data ? JSON.parse(data) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("auth")
}