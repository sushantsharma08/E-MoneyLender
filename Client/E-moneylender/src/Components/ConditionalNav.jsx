import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'


const ConditionalNav = ({children}) => {
    const [ShowNav, setShowNav] = useState(true)
    const Location = useLocation();

    useEffect(() => {
      if (Location.pathname=="/certificate") {
        setShowNav(false)
      }else{
        setShowNav(true)
      }
    
    }, [Location])
    

  return (
  <div> {ShowNav&&children}</div> 
  )
}

export default ConditionalNav