import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Dashboard />
    </BrowserRouter>
  )
}

export default App