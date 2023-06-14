
import './App.css'
import Form from './Form'
import Image from './page/Image'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom"

function App() {

  return (
    <div className="App">
      {/* <Form/> */}
      <Router>
        <div>
          <nav>
          <Link className='li' to="/" >home</Link>
          <Link className='li' to="/form" >form</Link>
          </nav>
        </div>
        <Routes>
          <Route path='/form' element={<Form/>} />
          <Route path='/' element={<Image/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
