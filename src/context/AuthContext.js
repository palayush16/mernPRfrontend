import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        
        case 'LOGOUT':
            return {user: null}
        
        default:
            return state
    }
} 

export const AuthContextProvider = ({children})=>{

    const [state, dispatch] =useReducer(authReducer,{
        user:null
    })


    //problem->suppose user logged in , then on refresh react auth context becomes null
    //but there  is still user stored in localStorage of browser
    //so intial check that if user in storage then update global auth satte to user
    useEffect(()=>{
       const user= JSON.parse(localStorage.getItem('user')) 

       if(user){
        dispatch({type: 'LOGIN', payload:user})
       }

    },[])

    console.log('AuthContext state ', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
        
    )

}