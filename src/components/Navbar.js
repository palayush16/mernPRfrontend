import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar=()=>{
    const {logout}= useLogout()
    
    //for adding eamil with logout button in navbar
    //we need global state therefor useAuthContext
    const {user}=useAuthContext()
    
    const handleClick= ()=>{
        logout()
    }


    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>PR Tracker</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>Hello, {user.email.split('@')[0]} ! </span>
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    
                    {!user && (
                        <div>
                            <Link to='/login'>Log In</Link>
                            <Link to='/signup'>Sign up</Link>
                        </div>
                    )}
                    
                </nav>
            </div>
        </header>
    )
    
}

export default Navbar
