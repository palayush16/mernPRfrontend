import {useAuthContext} from "../hooks/useAuthContext"
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"

export const useLogout=()=>{

    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()
    
    //for logging out we dont need to go to backend doing fetch
    //we can just do 2 things:
    //1.change global state
    //2. delete jwt stored in local Storage
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS', payload: null})
    }

    return {logout}
}

//using this logout in navbar