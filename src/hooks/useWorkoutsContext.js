import { WorkoutsContext } from '../context/WorkoutContext';
import { useContext } from 'react';


export const useWorkoutsContext= ()=>{
    const context= useContext(WorkoutsContext)  //object with state and dispatch function

    if(!context){
        throw Error('useWorkoutsContext must be used inside a WorkoutContextProvider')
    }

    return context
}
