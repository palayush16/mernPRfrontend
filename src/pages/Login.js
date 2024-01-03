import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //from useLogin custom hook
        await login(email, password)
        
    }

    return (
        <form  className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <label>Email: </label>
            <input 
                type="email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                //className={emptyFields.includes('email')? 'error' : ''}
            />
            <label>Password: </label>
            <input 
                type="password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                //className={emptyFields.includes('password')? 'error' : ''}
            />
            <button disabled={isLoading}>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login