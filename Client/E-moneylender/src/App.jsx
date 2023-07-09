
import './App.css'
import Form from './page/Form'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SearchClients from './page/SearchClients'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <div className="navbar">
            <Navbar />
          </div>
          <Routes>
            <Route path='/form' element={<Form />} />
            <Route path='/search' element={<SearchClients />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  )
}

export default App
