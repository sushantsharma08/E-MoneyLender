import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useGetUserId } from '../hooks/useGetUserId';
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [SmallScreenState, setSmallScreenState] = useState(" hidden")
  const userID = useGetUserId();
  const navigate = useNavigate();


  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth_login")
  }
  const ToggleSmallScreenNavTab = () => {
    if (SmallScreenState===" hidden") {
      setSmallScreenState("")
    }else{
      setSmallScreenState(" hidden")
    }
  }

  return (
    <div className="absolute  inset-x-0 top-0 z-50 border-b-2 border-slate-200/40">
      <header className="">
      <nav className="flex items-center justify-between  lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <span className="-m-1.5 p-1.5">
            <img className='logo' src="/images/logo.png" alt="" />
            {/* E-MoneyLender */}
          </span>
        </div>
        <div className='lg:hidden' onClick={ToggleSmallScreenNavTab}><button className=" rounded-md p-2.5 text-gray-700">
          {/* hello */}
          <img className='h-10' src="/images/nav_open.png" alt="" />
        </button></div>

        <div className="hidden lg:flex lg:gap-x-12">
          {!cookies.access_token ?
            <div>
              <Link className='li' to="/auth_login" >Login</Link>
              <Link className='li' to="/auth_register" >Register</Link>
            </div>
            :
            <div>
              <Link className='li' to="/" >Home</Link>
              <Link className='li' to="/form" >Add Client</Link>
              <Link className='li' to="/search" >All Clients</Link>
              {/* <Link className='li' to="/closedAccounts">Closed Acounts</Link> */}
            </div>}
        </div>
        {
          cookies.access_token ?
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>Log Out <span aria-hidden="true">&rarr;</span></button>
            </div> : <div className='hidden'>nothing</div>
        }

      </nav>
      {/* when screen => small */}
     
      <div className={"lg:hidden"+ SmallScreenState}role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="-m-1.5 p-1.5">
            <img className='h-24' src="/images/logo.png" alt="" />

            </span>
            <button type="button" onClick={ToggleSmallScreenNavTab} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="">
                {/* Close menu */}
          <img className='h-10' src="/images/nav_close.png" alt="" />

                </span>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {!cookies.access_token ?
                  <nav style={{ marginLeft: "150px" }}>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/auth_login" onClick={ToggleSmallScreenNavTab}>Login</Link>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/auth_register" onClick={ToggleSmallScreenNavTab}>Register</Link>
                  </nav>
                  :
                  <nav style={{ marginLeft: "150px" }}>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/" onClick={ToggleSmallScreenNavTab}>Home</Link>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/form" onClick={ToggleSmallScreenNavTab}>Add Client</Link>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/search" onClick={ToggleSmallScreenNavTab}>Search Clients</Link>
                    <Link className='li -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50' to="/closedAccounts" onClick={ToggleSmallScreenNavTab}>Closed Accounts</Link>
                    <button className='logout mt-7' onClick={logout}>Logout</button>
                  </nav>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
    
  )
}

export default Navbar