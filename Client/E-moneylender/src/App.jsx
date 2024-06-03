
import './App.css'
import Form from './page/Form'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SearchClients from './page/SearchClients'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Authentication from './page/Authentication'
import AuthRegister from './page/AuthRegister'
import Home from './page/Home'
import { useCookies } from "react-cookie"
import ClosedAccounts from './page/ClosedAccounts'
import Certificate from './page/Certificate'
import ConditionalNav from './Components/ConditionalNav'


const queryClient = new QueryClient()

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <div className="App">

      <Router>
        <QueryClientProvider client={queryClient}>
          <ConditionalNav className="navbar">
            <Navbar />
          </ConditionalNav>
          <div className="main mt-20 ">
            <Routes>
              <Route path='/'
                // render={data=>Authentication.} 
                element={!cookies.access_token ? <Navigate to="/auth_login" /> : <Home />} />
              <Route path='/auth_login' element={<Authentication />} />
              <Route path='/auth_register' element={<AuthRegister />} />
              <Route path='/form' element={!cookies.access_token ? <Navigate to="/auth_login" /> : <Form />} />
              <Route path='/search' element={!cookies.access_token ? <Navigate to="/auth_login" /> : <SearchClients />} />
              <Route path='/closedAccounts' element={!cookies.access_token ? <Navigate to="/auth_login" /> : <ClosedAccounts />} />
              <Route path='/certificate' element={!cookies.access_token ? <Navigate to="/auth_login" /> : <Certificate />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </Router>
    </div>
  )
}

export default App
