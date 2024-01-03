import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export  const workoutsReducer=(state, action)=>{  //state--> prev state    //action->'SET_WORKOUTS' and payload
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }
        default:
            return state
    }
}

//now provide this context to our application tree(whoel component tree) will do this by react context provider
export const WorkoutsContextProvider=({children})=>{  //children--> <App/> inside index.js
    const [state, dispatch]= useReducer(workoutsReducer, {    //similar to useState   workoutsReducer is the difference
        workouts: null
    })
    //dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]})

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}