import { Link } from 'react-router'
import './navbar.css'

export const Logo = ()=>{
    return (

      
      <div className="logo">
        <Link to={'/'} >
        <img src="/jrny_logo.png" alt="Logo" />
        </Link>
      </div>
    )
}  