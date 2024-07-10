import './App.css'
import { QueryClientProvider } from '@tanstack/react-query'

import { Home } from './pages/home'
import { client } from './lib/client'

function App() {
  return (
    <QueryClientProvider client={client}>
      <Home />
    </QueryClientProvider>
  )
}

export default App
