
import './App.css'
import Form from './Form'
import Image from './page/Image'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SearchClients from './page/SearchClients'

function App() {

  return (
    <div className="App">
      {/* <Form/> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Image />} />
          <Route path='/form' element={<Form />} />
          <Route path='/search' element={<SearchClients />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
