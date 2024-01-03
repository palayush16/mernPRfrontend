import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //could have written whole logic here but used custom hook instead

        await signup(email, password)
    }

    return (
        <form  className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
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
            <button disabled={isLoading} >Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup